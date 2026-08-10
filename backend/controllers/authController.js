const { adminEmail, adminPassword } = require('../config/env');
function login(req, res) { const { email, password } = req.body; if (email !== adminEmail || password !== adminPassword) return res.status(401).json({ error: 'E-mail ou senha inválidos.' }); req.session.admin = { email }; res.json({ message: 'Login realizado com sucesso.', admin: { email } }); }
function logout(req, res) { req.session.destroy(() => res.status(204).end()); }
function status(req, res) { res.json({ authenticated: Boolean(req.session?.admin), admin: req.session?.admin || null }); }
module.exports = { login, logout, status };
