import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './config.js'; // Função para conectar ao banco de dados
import publicRoutes from './routes/public.js'; // Rotas públicas
import adminRoutes from './routes/admin.js'; // Rotas administrativas

const app = express();

// Conectar ao banco de dados
connectDB();

// Middleware
app.use(cors()); // Habilitar CORS para permitir requisições de diferentes origens
app.use(bodyParser.json()); // Para analisar o corpo das requisições como JSON

// Montando rotas
app.use('/api/public', publicRoutes); // Rotas públicas
app.use('/api/admin', adminRoutes); // Rotas administrativas

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
