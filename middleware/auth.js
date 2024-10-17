import jwt from 'jsonwebtoken';

// Middleware de autenticação
const auth = (req, res, next) => {
  // Obtém o token do cabeçalho 'Authorization' e remove o prefixo 'Bearer '
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // Se o token não for fornecido, retorna um erro de acesso negado
  if (!token) {
    return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
  }

  try {
    // Verifica o token usando o segredo JWT armazenado nas variáveis de ambiente
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Armazena as informações decodificadas do token (por exemplo, o e-mail do usuário) na requisição
    req.user = decoded;
    
    // Chama o próximo middleware ou rota
    next();
  } catch (error) {
    // Se o token for inválido, retorna um erro
    res.status(400).json({ message: 'Token inválido' });
  }
};

export default auth;
