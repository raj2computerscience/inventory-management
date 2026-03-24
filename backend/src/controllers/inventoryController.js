const prisma = require('../utils/db');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// Get all inventory with pagination and filtering
exports.getInventory = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const search = req.query.search || '';
    const deviceType = req.query.deviceType || '';

    const where = {
      AND: [
        search ? {
          OR: [
            { deviceMake: { contains: search, mode: 'insensitive' } },
            { deviceModel: { contains: search, mode: 'insensitive' } },
            { serialNumber: { contains: search, mode: 'insensitive' } },
            { userName: { contains: search, mode: 'insensitive' } }
          ]
        } : {},
        deviceType ? { deviceType: { equals: deviceType } } : {}
      ]
    };

    const [inventory, total] = await Promise.all([
      prisma.inventory.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.inventory.count({ where })
    ]);

    res.json({
      inventory,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get single inventory item
exports.getInventoryById = async (req, res, next) => {
  try {
    const inventory = await prisma.inventory.findUnique({
      where: { id: parseInt(req.params.id) }
    });

    if (!inventory) {
      return res.status(404).json({ error: 'Inventory not found' });
    }

    res.json(inventory);
  } catch (error) {
    next(error);
  }
};

// Create new inventory
exports.createInventory = async (req, res, next) => {
  try {
    const { userName, deviceType, deviceMake, deviceModel, serialNumber, operatingSystem, processor, ram, disk, remarks } = req.body;

    // Validate required fields
    if (!userName || !deviceType || !serialNumber) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const inventory = await prisma.inventory.create({
      data: {
        userId: req.user?.id || 1, // Default user if not authenticated
        userName,
        deviceType,
        deviceMake,
        deviceModel,
        serialNumber,
        operatingSystem,
        processor,
        ram,
        disk,
        remarks
      }
    });

    res.status(201).json(inventory);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Serial number already exists' });
    }
    next(error);
  }
};

// Update inventory
exports.updateInventory = async (req, res, next) => {
  try {
    const { userName, deviceType, deviceMake, deviceModel, serialNumber, operatingSystem, processor, ram, disk, remarks } = req.body;

    const inventory = await prisma.inventory.update({
      where: { id: parseInt(req.params.id) },
      data: {
        userName,
        deviceType,
        deviceMake,
        deviceModel,
        serialNumber,
        operatingSystem,
        processor,
        ram,
        disk,
        remarks
      }
    });

    res.json(inventory);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Serial number already exists' });
    }
    next(error);
  }
};

// Delete inventory
exports.deleteInventory = async (req, res, next) => {
  try {
    await prisma.inventory.delete({
      where: { id: parseInt(req.params.id) }
    });

    res.json({ message: 'Inventory deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Import CSV
exports.importCSV = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const results = [];
    const duplicates = [];
    let successCount = 0;
    let failureCount = 0;

    const filePath = req.file.path;
    
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        try {
          const lookup = (fields) => {
            for (const field of fields) {
              if (Object.prototype.hasOwnProperty.call(data, field) && data[field] != null) {
                return String(data[field]).trim();
              }
            }
            return '';
          };

          const userName = lookup(['User Name', 'User name', 'username', 'UserName']);
          const deviceType = lookup(['Device Type', 'Device type', 'deviceType', 'devicetype']);
          const serialNumber = lookup(['Serial Number', 'Serial number', 'serialnumber', 'serialNo', 'Serial No']);

          if (!userName || !deviceType || !serialNumber) {
            failureCount++;
            return;
          }

          const deviceMakeModel = lookup(['Device Make/Model', 'Device Make', 'Device make', 'device make/model']);
          let deviceMake = '';
          let deviceModel = '';
          if (deviceMakeModel.includes('/')) {
            [deviceMake, deviceModel] = deviceMakeModel.split('/').map((v) => v.trim());
          } else {
            deviceMake = lookup(['Device Make', 'Device make', 'device make']) || '';
            deviceModel = lookup(['Device Model', 'Device model', 'device model']) || '';
          }

          results.push({
            userId: req.user?.id || 1,
            userName,
            deviceType,
            deviceMake,
            deviceModel,
            serialNumber,
            operatingSystem: lookup(['Operating System', 'OS', 'operating system']) || '',
            processor: lookup(['Processor', 'CPU']) || '',
            ram: lookup(['RAM', 'Memory']) || '',
            disk: lookup(['Disk', 'Storage']) || '',
            remarks: lookup(['Remarks', 'Remark', 'Notes']) || ''
          });
        } catch (error) {
          failureCount++;
        }
      })
      .on('end', async () => {
        try {
          // Check for duplicates in database
          const existingSerials = await prisma.inventory.findMany({
            where: {
              serialNumber: { in: results.map(r => r.serialNumber) }
            },
            select: { serialNumber: true }
          });

          const existingSerialNumbers = new Set(existingSerials.map(e => e.serialNumber));

          const toInsert = [];
          const finalDuplicates = [];

          results.forEach(record => {
            if (existingSerialNumbers.has(record.serialNumber)) {
              finalDuplicates.push(record.serialNumber);
            } else {
              toInsert.push(record);
            }
          });

          // Bulk insert
          if (toInsert.length > 0) {
            await prisma.inventory.createMany({
              data: toInsert
            });
            successCount = toInsert.length;
          }

          // Log import
          await prisma.importLog.create({
            data: {
              fileName: req.file.originalname,
              totalRecords: results.length,
              successCount,
              failureCount,
              duplicates: finalDuplicates.length,
              errorDetails: finalDuplicates.length > 0 ? `Duplicates: ${finalDuplicates.join(', ')}` : null
            }
          });

          // Clean up file
          fs.unlinkSync(filePath);

          res.json({
            message: 'CSV imported successfully',
            totalRecords: results.length,
            successCount,
            failureCount,
            duplicates: finalDuplicates.length,
            duplicateSerials: finalDuplicates
          });
        } catch (error) {
          console.error('Error processing CSV:', error);
          fs.unlinkSync(filePath);
          next(error);
        }
      })
      .on('error', (error) => {
        console.error('CSV parsing error:', error);
        fs.unlinkSync(filePath);
        res.status(400).json({ error: 'Error parsing CSV file' });
      });
  } catch (error) {
    next(error);
  }
};

// Dashboard statistics
exports.getDashboardStats = async (req, res, next) => {
  try {
    const totalDevices = await prisma.inventory.count();
    
    const devicesByType = await prisma.inventory.groupBy({
      by: ['deviceType'],
      _count: true
    });

    const osByDistribution = await prisma.inventory.groupBy({
      by: ['operatingSystem'],
      _count: true
    });

    res.json({
      totalDevices,
      devicesByType: devicesByType.map(d => ({
        type: d.deviceType,
        count: d._count
      })),
      osDistribution: osByDistribution.map(o => ({
        os: o.operatingSystem,
        count: o._count
      }))
    });
  } catch (error) {
    next(error);
  }
};

// Export to CSV
exports.exportToCSV = async (req, res, next) => {
  try {
    const inventory = await prisma.inventory.findMany();

    if (inventory.length === 0) {
      return res.status(404).json({ error: 'No inventory data to export' });
    }

    // Create CSV header
    const headers = ['S.No', 'User Name', 'Device Type', 'Device Make', 'Device Model', 'Serial Number', 'Operating System', 'Processor', 'RAM', 'Disk', 'Remarks', 'Created At'];
    
    // Create CSV rows
    const rows = inventory.map((item, index) => [
      index + 1,
      item.userName,
      item.deviceType,
      item.deviceMake,
      item.deviceModel,
      item.serialNumber,
      item.operatingSystem,
      item.processor,
      item.ram,
      item.disk,
      item.remarks,
      new Date(item.createdAt).toISOString()
    ]);

    // Create CSV content
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=inventory_export.csv');
    res.send(csvContent);
  } catch (error) {
    next(error);
  }
};
