const path = require('path');
const Database = require('better-sqlite3');
const db = new Database(path.join(__dirname, 'atendimentos.db'));
db.pragma('journal_mode = WAL');
db.exec(`CREATE TABLE IF NOT EXISTS atendimentos (
  id INTEGER PRIMARY KEY AUTOINCREMENT, protocolo TEXT NOT NULL UNIQUE, nome_cliente TEXT NOT NULL,
  contato TEXT NOT NULL, assunto TEXT NOT NULL, setor TEXT NOT NULL, descricao TEXT NOT NULL,
  observacoes TEXT NOT NULL DEFAULT '', status TEXT NOT NULL DEFAULT 'Pendente',
  criado_em TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
  atualizado_em TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
);`);
module.exports = db;
