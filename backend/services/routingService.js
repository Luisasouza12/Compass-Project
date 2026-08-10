const sectorsBySubject = { Financeiro: 'Setor Financeiro', 'Suporte técnico': 'Suporte', Comercial: 'Comercial', Agendamento: 'Atendimento/Agendamento', Outros: 'Atendimento Geral' };
function getSectorForSubject(subject) { return sectorsBySubject[subject] || null; }
function getAvailableSectors() { return [...new Set(Object.values(sectorsBySubject))]; }
module.exports = { sectorsBySubject, getSectorForSubject, getAvailableSectors };
