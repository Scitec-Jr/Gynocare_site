# 📊 Painel Administrativo - Gynocare

Painel administrativo moderno, responsivo e escalável para gerenciamento da clínica Gynocare.

## 🎯 Visão Geral

Este painel administrativo foi desenvolvido com Next.js 16.1.4, React 19.2.3 e TypeScript, seguindo as melhores práticas de arquitetura escalável.

### ✅ Funcionalidades Implementadas

- ✅ **Dashboard** - Página inicial com estatísticas e acesso rápido
- ✅ **Layout Responsivo** - Header, Sidebar colapsável e Footer
- ✅ **CRUD Completo** para:
  - Médicos
  - Exames
  - Procedimentos
  - Agendamentos
  - Avaliações
  - Usuários

- ✅ **Componentes Reutilizáveis**:
  - AdminTable - Tabela responsiva com paginação
  - AdminModal - Modal para confirmações e formulários
  - AdminForm - Formulários com validação
  - SearchBar - Busca e filtros
  - Pagination - Paginação inteligente
  - DashboardCard - Cards de acesso rápido

- ✅ **Dados Mockados** - Todos os módulos incluem dados de exemplo
- ✅ **Design Consistente** - Utiliza variáveis CSS do projeto

---

## 📁 Estrutura de Arquivos

```
src/
├── app/
│   └── adm/
│       ├── login/
│       │   └── page.tsx
│       └── (protected)/
│           ├── layout.tsx
│           ├── page.tsx (Dashboard)
│           ├── medicos/
│           │   └── page.tsx
│           ├── exames/
│           │   └── page.tsx
│           ├── procedimentos/
│           │   └── page.tsx
│           ├── agendamentos/
│           │   └── page.tsx
│           ├── avaliacoes/
│           │   └── page.tsx
│           └── usuarios/
│               └── page.tsx
│
├── components/
│   └── admin/
│       ├── AdminLayout.tsx
│       ├── AdminHeader.tsx
│       ├── AdminSidebar.tsx
│       ├── AdminFooter.tsx
│       ├── AdminTable.tsx
│       ├── AdminModal.tsx
│       ├── AdminForm.tsx
│       ├── DashboardCard.tsx
│       ├── SearchBar.tsx
│       ├── Pagination.tsx
│       └── index.ts
│
└── lib/
    └── admin/
        ├── types.ts (Interfaces TypeScript)
        ├── mockData.ts (Dados de exemplo)
        ├── utils.ts (Funções utilitárias)
        └── index.ts
```

---

## 🚀 Como Usar

### 1. Acessar o Painel

```bash
# Desenvolvimento
npm run dev

# Acessar em: http://localhost:3000/adm
```

### 2. Importar Componentes Admin

```typescript
// Opção 1: Import direto
import { AdminTable, AdminModal, AdminForm } from '@/components/admin';

// Opção 2: Import específico
import AdminLayout from '@/components/admin/AdminLayout';
```

### 3. Usar AdminTable

```typescript
'use client';

import { AdminTable, type TableColumn } from '@/components/admin';
import { Doctor } from '@/lib/admin';

const columns: TableColumn<Doctor>[] = [
  { key: 'name', label: 'Nome', sortable: true },
  { key: 'graduation', label: 'Especialidade' },
  {
    key: 'createdAt',
    label: 'Criado em',
    render: (value) => new Date(value).toLocaleDateString('pt-BR'),
  },
];

export default function DoctorsPage() {
  return (
    <AdminTable
      columns={columns}
      data={doctorsList}
      onEdit={handleEdit}
      onDelete={handleDelete}
      actions={true}
    />
  );
}
```

### 4. Usar AdminModal

```typescript
'use client';

import { AdminModal } from '@/components/admin';
import { useState } from 'react';

export default function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Abrir Modal</button>

      <AdminModal
        isOpen={isOpen}
        title="Confirmar Ação"
        onClose={() => setIsOpen(false)}
        onConfirm={handleConfirm}
        confirmText="Confirmar"
        type="default"
      >
        <p>Tem certeza que deseja continuar?</p>
      </AdminModal>
    </>
  );
}
```

### 5. Usar AdminForm com FormField

```typescript
'use client';

import { AdminForm, FormField } from '@/components/admin';
import { useState } from 'react';

export default function MyFormPage() {
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleSubmit = (e: React.FormEvent) => {
    console.log('Form data:', formData);
  };

  return (
    <AdminForm
      title="Novo Registro"
      onSubmit={handleSubmit}
      onCancel={() => window.history.back()}
    >
      <FormField
        label="Nome"
        name="name"
        value={formData.name}
        onChange={(value) => setFormData({ ...formData, name: value as string })}
        required
      />
      <FormField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={(value) => setFormData({ ...formData, email: value as string })}
        required
      />
    </AdminForm>
  );
}
```

---

## 🎨 Componentes Disponíveis

### AdminLayout
Wrapper para o layout administrativo com Sidebar, Header e Footer.

```typescript
<AdminLayout title="Minha Página" subtitle="Descrição">
  {children}
</AdminLayout>
```

### AdminSidebar
Navegação colapsável com links para todos os módulos.

**Features:**
- Colapsável em mobile
- Links ativos destacados
- Badges de notificação

### AdminHeader
Header sticky com título e botões de ações.

**Props:**
- `title` - Título da página
- `subtitle` - Subtítulo opcional

### AdminTable
Tabela responsiva com suporte a paginação e ações.

**Features:**
- Ordenação (preparada para backend)
- Render customizável por coluna
- Botões de ação (Editar, Deletar, Visualizar)
- Responsive

### AdminModal
Modal reutilizável para confirmações e formulários.

**Types:**
- `'default'` - Modal padrão
- `'danger'` - Modal de confirmação com aviso

### Pagination
Componente de paginação inteligente.

**Features:**
- Navegação entre páginas
- Elipsis para páginas distantes
- Desabilitado automaticamente

### SearchBar
Campo de busca e filtros.

**Props:**
- `onSearch` - Callback de busca
- `onFilter` - Callback de filtro (opcional)

---

## 📊 Tipos TypeScript

```typescript
// Doctor
interface Doctor {
  id: number;
  name: string;
  graduation: string;
  createdAt: string;
  updatedAt: string;
}

// Exam
interface Exam {
  id: number;
  name: string;
  slug: string;
  information: string;
  preparation: string;
  procedureId: number;
  createdAt: string;
  updatedAt: string;
}

// Appointment
interface Appointment {
  id: number;
  doctorId: number;
  examId: number;
  date: string;
  startTime: string;
  endTime: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

// User
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'doctor' | 'secretary';
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

// Review
interface Review {
  id: number;
  rating: number;
  text: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

// Procedure
interface Procedure {
  id: number;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}
```

---

## 🔧 Funções Utilitárias

```typescript
import {
  formatDate,
  formatDateTime,
  formatTime,
  validateEmail,
  validatePhone,
  truncateText,
  generateSlug,
} from '@/lib/admin/utils';

// Exemplos
formatDate('2024-06-03'); // "03/06/2024"
formatDateTime('2024-06-03'); // "03/06/2024 14:30"
formatTime('14:30'); // "14:30"
validateEmail('test@example.com'); // true
validatePhone('(11) 98765-4321'); // true
truncateText('Texto muito longo...', 10); // "Texto mui..."
generateSlug('Meu Procedimento'); // "meu-procedimento"
```

---

## 🎯 Próximas Etapas (TODO)

### 1. **Autenticação**
   - [ ] Implementar login/logout
   - [ ] Proteger rotas
   - [ ] Gerenciar sessões

### 2. **Integração com Backend**
   - [ ] Conectar endpoints da API
   - [ ] Remover dados mockados
   - [ ] Implementar cache/SWR

### 3. **Validações**
   - [ ] Validação client-side aprimorada
   - [ ] Mensagens de erro dinâmicas
   - [ ] Toast notifications

### 4. **Funcionalidades Avançadas**
   - [ ] Bulk actions (selecionar múltiplos)
   - [ ] Exportar dados (CSV/PDF)
   - [ ] Importar dados
   - [ ] Logs de auditoria

### 5. **Melhorias UX**
   - [ ] Loading states
   - [ ] Confirmação antes de sair com dados não salvos
   - [ ] Dark mode
   - [ ] Temas customizáveis

### 6. **Performance**
   - [ ] Lazy loading de dados
   - [ ] Virtualização de listas grandes
   - [ ] Otimização de imagens

---

## 📝 Convenções de Código

### Naming
- **Componentes**: PascalCase (ex: `AdminTable.tsx`)
- **Funções**: camelCase (ex: `formatDate()`)
- **Tipos**: PascalCase (ex: `Doctor`)
- **Constantes**: UPPER_SNAKE_CASE (ex: `MAX_ITEMS_PER_PAGE`)

### Estrutura de Componentes
```typescript
'use client'; // Se usar state/events

import { ReactNode } from 'react';
import { useCallback } from 'react';

interface ComponentProps {
  // Props
}

export default function ComponentName({ /* props */ }: ComponentProps) {
  // Estado
  // Callbacks
  // Render
  return <div></div>;
}
```

### TypeScript
- ✅ Sempre tipar props
- ✅ Usar interfaces para dados do backend
- ✅ Exportar tipos do `lib/admin/types.ts`
- ✅ Evitar `any` - usar `unknown` se necessário

---

## 🌐 Responsividade

Todos os componentes são totalmente responsivos:

- **Mobile** (< 640px): Stack vertical, Sidebar colapsável
- **Tablet** (640px - 1024px): Layout adaptado
- **Desktop** (> 1024px): Layout completo com Sidebar fixo

---

## 🎨 Design System

### Cores (CSS Variables)
```css
--main-color: #45C4C4 (Turquesa)
--main-light-color: #90DCDC (Turquesa Claro)
--main-dark-color: #1F6464 (Turquesa Escuro)
--secondary-color: #2FB2A3 (Verde Menta)
--light-color: #ACD0CC (Cinza Claro)
--dark-color: #000A09 (Preto)
```

### Tipografia
- **Títulos**: Font-family var(--font-title)
- **Texto**: Font-family var(--font-text)

---

## 📚 Referências

- [Next.js 16.1.4 Docs](https://nextjs.org)
- [React 19.2.3 Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)

---

## ✨ Melhorias Implementadas

- ✅ Código TypeScript fortemente tipado
- ✅ Componentes reutilizáveis e escaláveis
- ✅ Design consistente com o site
- ✅ Totalmente responsivo
- ✅ Sem dependências externas desnecessárias
- ✅ Estrutura preparada para backend
- ✅ Dados mockados para testes

---

**Desenvolvido com ❤️ para Gynocare**
