# Central+ — Sistema de Atendimento ao Cliente

Aplicação web para registrar, encaminhar e acompanhar solicitações de clientes. Foi pensada como projeto de portfólio: a pessoa cliente realiza um atendimento guiado e a equipe opera os registros em um painel separado e protegido.

## Funcionalidades

- Fluxo de atendimento em três etapas, com validação e protocolo automático.
- Encaminhamento automático por assunto para o setor adequado.
- Persistência real em banco SQLite, criado automaticamente na primeira execução.
- API REST para criar, listar, consultar, atualizar e remover atendimentos.
- Painel administrativo com autenticação simples, indicadores, busca, filtros e ordenação.
- Alteração de status, setor e observações internas.
- Interface responsiva, com feedback de erros e estados visuais por status.

## Tecnologias

HTML5, CSS3, JavaScript puro, Node.js, Express, SQLite (`better-sqlite3`), `express-session` e `dotenv`.

## Estrutura

```text
backend/
  config/        # Leitura das variáveis de ambiente
  controllers/   # Regras dos endpoints
  database/      # Inicialização e arquivo SQLite local
  middlewares/   # Proteção de rotas administrativas
  routes/        # Rotas da API
  services/      # Protocolo e direcionamento
  server.js
frontend/
  css/ js/ pages/ # Interfaces do cliente e administração
```

## Como executar

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Copie `.env.example` para `.env` e defina uma senha segura para o painel:

   ```bash
   copy .env.example .env
   ```

3. Inicie a aplicação:

   ```bash
   npm start
   ```

O banco `backend/database/atendimentos.db` e sua tabela são criados automaticamente. Acesse `http://localhost:3000` para o atendimento e `http://localhost:3000/admin` para o painel. Use as credenciais definidas no `.env` (em desenvolvimento, os valores padrão são `admin@exemplo.com` e `admin123`).

## API

| Método | Rota | Uso |
| --- | --- | --- |
| `POST` | `/api/atendimentos` | Cria um atendimento (pública) |
| `GET` | `/api/atendimentos` | Lista atendimentos (admin) |
| `GET` | `/api/atendimentos/:id` | Detalhes (admin) |
| `PUT` | `/api/atendimentos/:id` | Atualiza status, setor ou observações (admin) |
| `DELETE` | `/api/atendimentos/:id` | Exclui um atendimento (admin) |
| `GET` | `/api/atendimentos/dashboard` | Indicadores do painel (admin) |

Exemplo de criação:

```json
POST /api/atendimentos
{
  "nome_cliente": "Ana Silva",
  "contato": "ana@email.com",
  "assunto": "Suporte técnico",
  "descricao": "Não consigo acessar a minha conta."
}
```

## Próximas melhorias

- Contas administrativas persistidas com senha criptografada.
- Anexos, histórico de alterações e notificações por e-mail.
- Paginação e testes automatizados.
- Implantação com armazenamento de sessão apropriado para produção.
