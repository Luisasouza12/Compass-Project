function generateProtocol() { const stamp = new Date().toISOString().slice(0, 10).replaceAll('-', ''); const random = Math.floor(1000 + Math.random() * 9000); return `AT-${stamp}-${random}`; }
module.exports = { generateProtocol };
