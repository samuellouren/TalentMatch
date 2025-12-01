# Backend - TalentMatch

## Configuração

1. Instale as dependências:
\`\`\`bash
npm install
\`\`\`

2. Execute o servidor:
\`\`\`bash
npm run dev
\`\`\`

O servidor estará rodando em `http://localhost:3333`

## Variáveis de Ambiente

- `PORT`: Porta do servidor (padrão: 3333)
- `JWT_SECRET`: Chave secreta para assinar tokens JWT (IMPORTANTE: alterar em produção!)
- `DATABASE_FILE`: Nome do arquivo do banco SQLite (padrão: users.db)

## Rotas da API

### Autenticação
- `POST /api/auth/register` - Cadastro de usuário
- `POST /api/auth/login` - Login
- `PUT /api/auth/profile` - Atualizar perfil (requer autenticação)
- `PUT /api/auth/password` - Alterar senha (requer autenticação)

### Usuários (requer autenticação)
- `GET /api/users` - Listar todos os usuários
- `GET /api/users/:id` - Buscar usuário por ID
- `PUT /api/users/:id` - Atualizar usuário
- `DELETE /api/users/:id` - Deletar usuário
