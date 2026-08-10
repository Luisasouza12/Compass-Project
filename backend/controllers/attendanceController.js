const db = require('../database/database');
const { getSectorForSubject, getAvailableSectors } = require('../services/routingService');
const { generateProtocol } = require('../services/protocolService');
const validSubjects = ['Financeiro', 'Suporte técnico', 'Comercial', 'Agendamento', 'Outros'];
const validStatuses = ['Pendente', 'Em atendimento', 'Resolvido', 'Cancelado'];
const normalize = (value) => typeof value === 'string' ? value.trim() : '';
const serialize = (row) => row ? { ...row, observacoes: row.observacoes || '' } : null;
function create(req, res) {
  const { nome_cliente, contato, assunto, descricao } = req.body;
  if (![nome_cliente, contato, assunto, descricao].every((value) => normalize(value))) return res.status(400).json({ error: 'Preencha nome, contato, assunto e descrição.' });
  if (!validSubjects.includes(normalize(assunto))) return res.status(400).json({ error: 'Assunto inválido.' });
  if (normalize(nome_cliente).length > 120 || normalize(contato).length > 120 || normalize(descricao).length > 2000) return res.status(400).json({ error: 'Um dos campos excede o tamanho permitido.' });
  let protocolo = generateProtocol(); while (db.prepare('SELECT 1 FROM atendimentos WHERE protocolo = ?').get(protocolo)) protocolo = generateProtocol();
  const result = db.prepare('INSERT INTO atendimentos (protocolo, nome_cliente, contato, assunto, setor, descricao) VALUES (?, ?, ?, ?, ?, ?)').run(protocolo, normalize(nome_cliente), normalize(contato), normalize(assunto), getSectorForSubject(normalize(assunto)), normalize(descricao));
  res.status(201).json(serialize(db.prepare('SELECT * FROM atendimentos WHERE id = ?').get(result.lastInsertRowid)));
}
function list(req, res) {
  const { search = '', setor = '', status = '', order = 'desc' } = req.query; const conditions = []; const params = [];
  if (normalize(search)) { conditions.push('(nome_cliente LIKE ? OR protocolo LIKE ?)'); params.push(`%${normalize(search)}%`, `%${normalize(search)}%`); }
  if (normalize(setor)) { conditions.push('setor = ?'); params.push(normalize(setor)); }
  if (normalize(status)) { conditions.push('status = ?'); params.push(normalize(status)); }
  const direction = order === 'asc' ? 'ASC' : 'DESC'; const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  res.json(db.prepare(`SELECT * FROM atendimentos ${where} ORDER BY criado_em ${direction}, id ${direction}`).all(...params).map(serialize));
}
function getOne(req, res) { const item = db.prepare('SELECT * FROM atendimentos WHERE id = ?').get(req.params.id); if (!item) return res.status(404).json({ error: 'Atendimento não encontrado.' }); res.json(serialize(item)); }
function update(req, res) {
  const current = db.prepare('SELECT * FROM atendimentos WHERE id = ?').get(req.params.id); if (!current) return res.status(404).json({ error: 'Atendimento não encontrado.' });
  const status = normalize(req.body.status) || current.status; const setor = normalize(req.body.setor) || current.setor; const observacoes = typeof req.body.observacoes === 'string' ? req.body.observacoes.trim() : current.observacoes;
  if (!validStatuses.includes(status)) return res.status(400).json({ error: 'Status inválido.' }); if (!getAvailableSectors().includes(setor)) return res.status(400).json({ error: 'Setor inválido.' }); if (observacoes.length > 3000) return res.status(400).json({ error: 'Observações excedem o tamanho permitido.' });
  db.prepare("UPDATE atendimentos SET status = ?, setor = ?, observacoes = ?, atualizado_em = datetime('now', 'localtime') WHERE id = ?").run(status, setor, observacoes, req.params.id);
  res.json(serialize(db.prepare('SELECT * FROM atendimentos WHERE id = ?').get(req.params.id)));
}
function remove(req, res) { const result = db.prepare('DELETE FROM atendimentos WHERE id = ?').run(req.params.id); if (!result.changes) return res.status(404).json({ error: 'Atendimento não encontrado.' }); res.status(204).end(); }
function dashboard(req, res) { const total = db.prepare('SELECT COUNT(*) AS value FROM atendimentos').get().value; const rows = db.prepare('SELECT status, COUNT(*) AS value FROM atendimentos GROUP BY status').all(); const metrics = { total, pendentes: 0, emAtendimento: 0, resolvidos: 0 }; rows.forEach(({ status, value }) => { if (status === 'Pendente') metrics.pendentes = value; if (status === 'Em atendimento') metrics.emAtendimento = value; if (status === 'Resolvido') metrics.resolvidos = value; }); res.json(metrics); }
module.exports = { create, list, getOne, update, remove, dashboard };
