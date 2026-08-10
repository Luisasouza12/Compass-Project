# 🧭 Central+ — Sistema de Atendimento ao Cliente

Uma aplicação web desenvolvida para **registrar, encaminhar e acompanhar solicitações de clientes** de forma organizada e centralizada.

O projeto foi desenvolvido como parte de um **portfólio de desenvolvimento web**, simulando um cenário real em que clientes realizam um atendimento guiado enquanto a equipe responsável gerencia as solicitações por meio de um painel administrativo.

---

## ✨ Funcionalidades

### 👤 Atendimento do cliente

* Fluxo de atendimento dividido em três etapas.
* Validação dos dados preenchidos.
* Geração automática de protocolo.
* Encaminhamento automático por assunto para o setor adequado.
* Interface responsiva e intuitiva.
* Feedback visual para erros e diferentes status do atendimento.

### 🔐 Painel administrativo

* Autenticação para acesso ao painel.
* Indicadores gerais dos atendimentos.
* Busca, filtros e ordenação.
* Visualização detalhada das solicitações.
* Alteração de status.
* Alteração do setor responsável.
* Adição de observações internas.
* Exclusão de atendimentos.

### 🗄️ Persistência e API

* Banco de dados SQLite criado automaticamente na primeira execução.
* API REST para gerenciamento dos atendimentos.
* Operações de criação, consulta, atualização e exclusão.

---

## 🛠️ Tecnologias utilizadas

| Tecnologia          | Utilização                             |
| ------------------- | -------------------------------------- |
| **HTML5**           | Estrutura das interfaces               |
| **CSS3**            | Estilização e responsividade           |
| **JavaScript**      | Lógica da aplicação e interações       |
| **Node.js**         | Ambiente de execução do backend        |
| **Express**         | Construção da API REST                 |
| **SQLite**          | Persistência dos dados                 |
| **better-sqlite3**  | Integração com o banco SQLite          |
| **express-session** | Gerenciamento de sessões               |
| **dotenv**          | Gerenciamento de variáveis de ambiente |

---

## 📁 Estrutura do projeto

```text
Compass-Project/
│
├── backend/
│   ├── config/          # Configurações e variáveis de ambiente
│   ├── controllers/     # Regras dos endpoints
│   ├── database/        # Banco e inicialização do SQLite
│   ├── middlewares/     # Proteção das rotas administrativas
│   ├── routes/          # Rotas da API
│   ├── services/        # Protocolo e direcionamento
│   └── server.js        # Inicialização do servidor
│
├── frontend/
│   ├── css/             # Estilos
│   ├── js/              # Scripts
│   └── pages/           # Interfaces do sistema
│
├── .env.example         # Exemplo das variáveis de ambiente
├── .gitignore           # Arquivos ignorados pelo Git
├── package.json         # Dependências e scripts
└── README.md            # Documentação do projeto
```

---

## 🚀 Como executar

### 1. Clone o repositório

```bash
git clone https://github.com/Luisasouza12/Compass-Project.git
```

### 2. Acesse a pasta do projeto

```bash
cd Compass-Project
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Configure as variáveis de ambiente

Copie o arquivo `.env.example` para `.env`:

**Windows:**

```bash
copy .env.example .env
```

Defina no arquivo `.env` as configurações necessárias para o painel administrativo.

> ⚠️ O arquivo `.env` não deve ser enviado para o GitHub. Ele já está incluído no `.gitignore`.

### 5. Inicie a aplicação

```bash
npm start
```

O banco de dados SQLite e sua estrutura são criados automaticamente na primeira execução.

### 6. Acesse a aplicação

**Atendimento do cliente:**

```text
http://localhost:3000
```

**Painel administrativo:**

```text
http://localhost:3000/admin
```

As credenciais utilizadas no ambiente de desenvolvimento são definidas pelas variáveis configuradas no `.env`.

---

## 🔌 API REST

| Método   | Endpoint                      | Descrição                              |
| -------- | ----------------------------- | -------------------------------------- |
| `POST`   | `/api/atendimentos`           | Cria um novo atendimento               |
| `GET`    | `/api/atendimentos`           | Lista os atendimentos                  |
| `GET`    | `/api/atendimentos/:id`       | Consulta os detalhes de um atendimento |
| `PUT`    | `/api/atendimentos/:id`       | Atualiza status, setor ou observações  |
| `DELETE` | `/api/atendimentos/:id`       | Exclui um atendimento                  |
| `GET`    | `/api/atendimentos/dashboard` | Retorna os indicadores do painel       |

### Exemplo de criação de atendimento

```json
{
  "nome_cliente": "Ana Silva",
  "contato": "ana@email.com",
  "assunto": "Suporte técnico",
  "descricao": "Não consigo acessar a minha conta."
}
```

---

## 🔄 Fluxo da aplicação

```text
Cliente
   ↓
Atendimento guiado
   ↓
Validação dos dados
   ↓
Geração do protocolo
   ↓
Direcionamento automático
   ↓
Banco de dados
   ↓
Painel administrativo
   ↓
Gestão do atendimento
```

---

## 🔮 Próximas melhorias

* [ ] Contas administrativas persistidas com senha criptografada.
* [ ] Anexos nos atendimentos.
* [ ] Histórico de alterações.
* [ ] Notificações por e-mail.
* [ ] Paginação dos resultados.
* [ ] Testes automatizados.
* [ ] Implantação em ambiente de produção.
* [ ] Armazenamento de sessão adequado para produção.

---

## 👩‍💻 Sobre o projeto

O **Central+** foi desenvolvido como projeto de portfólio com o objetivo de demonstrar conhecimentos em **desenvolvimento web, construção de APIs REST, gerenciamento de banco de dados, autenticação, organização de código e desenvolvimento de interfaces responsivas**.

---

⭐ Se este projeto foi útil ou interessante para você, considere deixar uma estrela no repositório!
