# TalentMatch 🎯

Sistema full-stack para gerenciamento de candidatos e vagas de emprego, desenvolvido como Projeto Integrador na UMJ.

A ideia surgiu da necessidade de centralizar o processo seletivo: empresas cadastram vagas, candidatos se inscrevem, e o sistema gerencia todo o fluxo com autenticação segura.

## ✨ Funcionalidades

- Cadastro e autenticação de usuários com JWT
- Gerenciamento de vagas (criar, listar, editar, remover)
- Inscrição de candidatos em vagas
- Senhas criptografadas com bcrypt
- API REST documentada

## 🛠️ Tecnologias

**Frontend**
- React + Vite
- React Router DOM
- Axios
- Context API para estado global

**Backend**
- Node.js + Express
- SQLite (better-sqlite3)
- JWT para autenticação
- bcrypt para hash de senhas

- ## 🔒 Segurança
- Senhas criptografadas com **bcrypt**
- Autenticação via **JWT** com segredo via variável de ambiente
- **Rate limiting** nas rotas de autenticação (10 req / 15min por IP)
- Headers de segurança HTTP com **Helmet**
- CORS restritivo — apenas origens autorizadas
- Variáveis sensíveis isoladas em `.env` (nunca versionadas)

## 📁 Estrutura

```
projetointegrador25/
├── Frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── context/
└── Backend/
    ├── config/
    ├── controllers/
    ├── models/
    └── routes/
```

## 🚀 Como rodar localmente

**Backend**
```bash
cd Backend
npm install
npm run dev
```

**Frontend**
```bash
cd Frontend
npm install
npm run dev
```

O frontend roda em `http://localhost:5173` e o backend em `http://localhost:3000`.

demo: "https://talent-match-two.vercel.app"

## 👨‍💻 Autor

Samuel Louren — [GitHub](https://github.com/samuellouren) · [LinkedIn](https://linkedin.com/in/samuellouren)
