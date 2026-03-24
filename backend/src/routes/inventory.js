const express = require('express');
const multer = require('multer');
const inventoryController = require('../controllers/inventoryController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// All routes require authentication (optional - can be commented out)
// router.use(authMiddleware);

// Get all inventory
router.get('/', inventoryController.getInventory);

// Get single inventory item
router.get('/:id', inventoryController.getInventoryById);

// Create new inventory
router.post('/', inventoryController.createInventory);

// Update inventory
router.put('/:id', inventoryController.updateInventory);

// Delete inventory
router.delete('/:id', inventoryController.deleteInventory);

// Dashboard statistics
router.get('/stats/dashboard', inventoryController.getDashboardStats);

// Import CSV
router.post('/import', upload.single('file'), inventoryController.importCSV);

// Export to CSV
router.get('/export/csv', inventoryController.exportToCSV);

module.exports = router;
