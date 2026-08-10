const path = require('path'); const express = require('express'); const session = require('express-session'); const { port, sessionSecret } = require('./config/env'); require('./database/database');
const app = express(); app.use(express.json({ limit: '100kb' })); app.use(session({ secret: sessionSecret, resave: false, saveUninitialized: false, cookie: { httpOnly: true, sameSite: 'lax', maxAge: 28800000 } }));
app.use('/api/auth', require('./routes/authRoutes')); app.use('/api/atendimentos', require('./routes/attendanceRoutes'));
app.get('/', (req, res) => res.redirect('/atendimento'));
app.get('/atendimento', (req, res) => res.sendFile(path.join(__dirname, '../frontend/index.html')));
app.use(express.static(path.join(__dirname, '../frontend')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, '../frontend/pages/login.html')));
app.get('/admin', (req, res) => { if (!req.session?.admin) return res.redirect('/login'); res.sendFile(path.join(__dirname, '../frontend/pages/admin.html')); });
app.use((req, res) => res.status(404).json({ error: 'Rota não encontrada.' })); app.listen(port, () => console.log(`Central de Atendimento disponível em http://localhost:${port}`));
