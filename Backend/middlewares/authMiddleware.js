import jwt from "jsonwebtoken"

// Segredo usado para verificar tokens JWT (definido no arquivo .env)
// Sem fallback hardcoded: se faltar, o servidor não sobe — melhor falhar
// na inicialização do que aceitar tokens assinados com um segredo público
const SECRET = process.env.JWT_SECRET
if (!SECRET) {
  throw new Error("JWT_SECRET não definido. Configure o arquivo .env (veja .env.example).")
}

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({
      message: "Token não fornecido.",
    })
  }

  const token = authHeader.replace("Bearer ", "")

  try {
    const decoded = jwt.verify(token, SECRET)
    req.userId = decoded.id
    req.userEmail = decoded.email
    next()
  } catch (err) {
    return res.status(401).json({
      message: "Token inválido ou expirado.",
    })
  }
}

export default authMiddleware
