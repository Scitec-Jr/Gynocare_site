# Backend Gynocare - Guia de Configuração

## Visão Geral da Arquitetura

O backend foi implementado seguindo o padrão em camadas:

```
Request HTTP → API Route (validação/autenticação) 
                    ↓
              Services (lógica de negócio)
                    ↓
              Repositories (acesso ao DB)
                    ↓
              Database (MySQL)
```

## Instalação de Dependências

```bash
npm install bcryptjs zod mysql2
npm install --save-dev @types/bcryptjs
```

## Configuração do Banco de Dados

### 1. Criar tabela de usuários

Execute o SQL em `server/db/create_usuarios_table.sql`:

```sql
CREATE TABLE Usuarios (
  Id INT PRIMARY KEY AUTO_INCREMENT,
  Nome VARCHAR(255) NOT NULL,
  Email VARCHAR(255) UNIQUE NOT NULL,
  Senha VARCHAR(255) NOT NULL,
  Funcao ENUM('admin', 'doctor', 'secretary') NOT NULL,
  Ativo BOOLEAN DEFAULT TRUE,
  Criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  Atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (Email),
  INDEX idx_ativo (Ativo)
);
```

### 2. Criar usuário admin

```bash
# Via Node.js REPL
node
> const bcryptjs = require('bcryptjs');
> bcryptjs.hash('admin123', 10).then(hash => console.log(hash));
```

Copie o hash gerado e insira na tabela:

```sql
INSERT INTO Usuarios (Nome, Email, Senha, Funcao, Ativo)
VALUES ('Admin', 'admin@gynocare.com', '<PASTE_HASH_HERE>', 'admin', TRUE);
```

## Configuração de Ambiente

Crie `.env.local`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=gynocare
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Estrutura de Arquivos

### Autenticação e Autorização
- `src/lib/auth/config.ts` - Configurações de segurança
- `src/lib/auth/passwords.ts` - Hash e comparação de senhas
- `src/lib/auth/session.ts` - Gerenciamento de sessão em HTTP-only cookie
- `src/middleware.ts` - Proteção de rotas

### Banco de Dados
- `src/lib/db/connection.ts` - Pool de conexões e funções query

### Validação
- `src/lib/validations/` - Schemas Zod para todos os recursos

### Repositórios
- `src/repositories/` - Acesso ao banco de dados com queries parametrizadas

### Serviços
- `src/services/` - Lógica de negócio e validações

### API Routes
- `src/app/api/auth/` - Login e logout
- `src/app/api/doutores/` - CRUD de médicos
- `src/app/api/exames/` - CRUD de exames
- `src/app/api/procedimentos/` - CRUD de procedimentos
- `src/app/api/agendamentos/` - CRUD de agendamentos
- `src/app/api/avaliacoes/` - CRUD de avaliações
- `src/app/api/usuarios/` - CRUD de usuários

### Frontend
- `src/app/adm/login/page.tsx` - Página de login
- `src/app/adm/` - Painel protegido (requer autenticação)

## Endpoints Disponíveis

### Autenticação
```
POST /api/auth/login
  Body: { email: string, password: string }
  Response: { success: true, user: { id, email, name, role } }

POST /api/auth/logout
  Response: { success: true }
```

### Médicos
```
GET /api/doutores?page=1&limit=10&search=nome
  Response: { data: [...], total, page, pageSize, totalPages }

POST /api/doutores
  Body: { name: string, graduation: string }
  Response: { id, name, graduation }

GET /api/doutores/[id]
PUT /api/doutores/[id]
DELETE /api/doutores/[id]
```

### Exames
```
GET /api/exames?page=1&limit=10&search=nome
POST /api/exames
  Body: { name, slug, information, preparation, procedureId }
GET /api/exames/[id]
PUT /api/exames/[id]
DELETE /api/exames/[id]
```

### Procedimentos
```
GET /api/procedimentos?page=1&limit=10&search=nome
POST /api/procedimentos
  Body: { name, slug }
GET /api/procedimentos/[id]
PUT /api/procedimentos/[id]
DELETE /api/procedimentos/[id]
```

### Agendamentos
```
GET /api/agendamentos?page=1&limit=10&search=telefone
POST /api/agendamentos
  Body: { doctorId, examId, date, startTime, endTime, phone }
GET /api/agendamentos/[id]
PUT /api/agendamentos/[id]
DELETE /api/agendamentos/[id]
```

### Avaliações
```
GET /api/avaliacoes?page=1&limit=10&status=true
POST /api/avaliacoes - Apenas leitura/edição de admin
GET /api/avaliacoes/[id]
PUT /api/avaliacoes/[id]
  Body: { rating, text, status }
DELETE /api/avaliacoes/[id]
```

### Usuários
```
GET /api/usuarios?page=1&limit=10&search=nome
POST /api/usuarios
  Body: { name, email, password, role: 'admin'|'doctor'|'secretary' }
GET /api/usuarios/[id]
PUT /api/usuarios/[id]
DELETE /api/usuarios/[id]
```

## Segurança

### Protegido
✅ Todas as rotas de API verificam autenticação (sessão)
✅ Senhas hasheadas com bcryptjs (salt rounds: 10)
✅ Queries parametrizadas (previne SQL injection)
✅ Validação Zod em todos endpoints
✅ Sessão em HTTP-only cookie (não acessível via JS)
✅ Middleware protege rotas `/adm/*` (exceto login)

### Validação
✅ Email único por usuário
✅ Slug único para exames
✅ Verificação de existência de relacionamentos
✅ Validação de telefone (regex)
✅ Validação de avaliação (1-5)

## Fluxo de Login

1. Usuário acessa `/adm/login`
2. Submete email e senha
3. API valida e verifica credenciais
4. Se válido, cria sessão em HTTP-only cookie
5. Redireciona para `/adm` (protegido por middleware)
6. Middleware verifica sessão a cada request
7. SessionCookie expira em 24 horas

## Próximos Passos

1. ✅ Camada de autenticação
2. ✅ Repositórios com queries parametrizadas
3. ✅ Serviços com validação
4. ✅ API Routes com CRUD
5. ✅ Middleware de proteção
6. ⏳ Integração frontend com APIs reais (remover mock data)
7. ⏳ Testes de API
8. ⏳ Autenticação OTP (opcional)
9. ⏳ Audit logs de ações administrativas

## Testar Localmente

1. Configure `.env.local`
2. Execute migrations do DB
3. Crie usuário admin
4. Execute `npm run dev`
5. Acesse `http://localhost:3000/adm/login`
6. Faça login com: `admin@gynocare.com` / `admin123`
