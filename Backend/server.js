// Carrega variáveis de ambiente do arquivo .env ANTES de qualquer outro import
// (precisa ser o primeiro import para que process.env já esteja preenchido
// quando os outros módulos forem carregados)
import "dotenv/config"

// Importa bibliotecas necessárias
import express from "express" // Framework para criar servidor web
import cors from "cors" // Permite que frontend e backend se comuniquem
import helmet from "helmet" // Adiciona headers de segurança HTTP
import rateLimit from "express-rate-limit" // Limita requisições por IP
import authRoutes from "./routes/authRoutes.js" // Rotas de autenticação
import candidateRoutes from "./routes/candidateRoutes.js"
import jobRoutes from "./routes/jobRoutes.js"
import applicationRoutes from "./routes/applicationRoutes.js"

// Cria aplicação Express
const app = express()

// Define porta do servidor (vem do .env, com fallback para 3333)
const PORT = process.env.PORT || 3333

// ===== MIDDLEWARES =====
// Middlewares são funções que processam requisições antes de chegarem nas rotas

// 1. Helmet - Adiciona headers de segurança HTTP automaticamente
// (X-Content-Type-Options, Strict-Transport-Security, entre outros)
app.use(helmet())

// 2. CORS restritivo - Só aceita requisições da origem definida em ALLOWED_ORIGIN
// Requisições de outros sites são bloqueadas pelo navegador
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN || "http://localhost:5173",
  })
)

// 3. JSON Parser - Converte JSON recebido em objeto JavaScript
app.use(express.json())

// 4. Rate limiter para autenticação - máximo 10 requisições por IP
// a cada 15 minutos, para dificultar ataques de força bruta no login
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 10, // máximo de requisições por IP dentro da janela
  standardHeaders: true, // envia info do limite nos headers RateLimit-*
  legacyHeaders: false, // desativa headers X-RateLimit-* (obsoletos)
  message: {
    message: "Muitas tentativas. Tente novamente em 15 minutos.",
  },
})

// ===== ROTAS =====

app.use("/api/auth", authLimiter, authRoutes)

// Rotas públicas
app.use("/api", candidateRoutes)
app.use("/api", jobRoutes)
app.use("/api", applicationRoutes)

// ===== TRATAMENTO DE ERROS =====

// Rota não encontrada (404)
app.use((req, res) => {
  res.status(404).json({
    message: `Rota ${req.url} não encontrada`,
  })
})

// Erro interno do servidor (500)
app.use((err, req, res, next) => {
  console.error(" Erro:", err.stack)

  // Em produção, não expõe detalhes internos do erro na resposta
  // (stack trace revela estrutura do código e facilita ataques)
  const isProduction = process.env.NODE_ENV === "production"

  res.status(500).json({
    message: "Erro interno no servidor",
    ...(isProduction ? {} : { error: err.message, stack: err.stack }),
  })
})

// ===== INICIALIZAÇÃO DO SERVIDOR =====

// Inicia o servidor na porta definida
app.listen(PORT, () => {
  console.log(`\n Servidor rodando em http://localhost:${PORT}`)
  console.log(` API disponível em http://localhost:${PORT}/api`)
  console.log(" Rotas disponíveis:")
  console.log("  POST /api/auth/register  - Cadastro de usuário")
  console.log("  POST /api/auth/login     - Login de usuário")
  console.log("  GET  /api/candidates     - Listar candidatos")
  console.log("  POST /api/candidates     - Adicionar candidato")
  console.log("  GET  /api/candidates/:id - Ver detalhes do candidato")
  console.log("  GET  /api/jobs           - Listar vagas")
  console.log("  POST /api/jobs           - Adicionar vaga")
  console.log("  GET  /api/jobs/:id       - Ver detalhes da vaga")
  console.log("  POST /api/applications   - Adicionar candidato a vaga")
  console.log("  GET  /api/applications   - Listar todas aplicações")
  console.log("")
})
