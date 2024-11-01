import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './config.js';
import publicRoutes from './routes/public.js';
import adminRoutes from './routes/admin.js';
import helmet from 'helmet'; // Segurança adicional


const app = express();


// Conectar ao banco de dados
connectDB().then(() => {
  console.log('MongoDB conectado com sucesso');
}).catch(err => {
  console.error('Erro ao conectar ao MongoDB:', err.message);
  process.exit(1);
});

// Middlewares de segurança e configuração
app.use(cors()); // Habilitar CORS
app.use(helmet()); // Adicionar headers de segurança
app.use(bodyParser.json()); // Parse JSON requests

// Rotas
app.use('/api/public', publicRoutes);
app.use('/api/admin', adminRoutes);

// Middleware de tratamento global de erros
app.use((err, req, res, next) => {
  console.error('Erro no servidor:', err.stack); // Log do erro
  res.status(500).json({ message: 'Erro no servidor, por favor, tente novamente mais tarde.' });
});

// Iniciar o servidor e definir a porta
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
