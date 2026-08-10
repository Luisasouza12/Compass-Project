const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
module.exports = { port: Number(process.env.PORT) || 3000, sessionSecret: process.env.SESSION_SECRET || 'desenvolvimento-altere-no-env', adminEmail: process.env.ADMIN_EMAIL || 'admin@exemplo.com', adminPassword: process.env.ADMIN_PASSWORD || 'admin123' };
