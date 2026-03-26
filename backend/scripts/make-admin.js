/**
 * Helper script to promote a user to admin role
 * Usage: node scripts/make-admin.js user@email.com
 */

const prisma = require('../src/utils/db');

async function makeUserAdmin(email) {
  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      console.error(`❌ User with email "${email}" not found`);
      process.exit(1);
    }

    const updatedUser = await prisma.user.update({
      where: { email },
      data: { role: 'admin' }
    });

    console.log(`✅ User "${updatedUser.username}" (${updatedUser.email}) is now an admin`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error updating user:', error.message);
    process.exit(1);
  }
}

const email = process.argv[2];
if (!email) {
  console.error('Usage: node scripts/make-admin.js user@email.com');
  process.exit(1);
}

makeUserAdmin(email);
