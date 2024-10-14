import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './config.js'; // Função para conectar ao banco de dados
import publicRoutes from './routes/public.js'; // Rotas públicas
import adminRoutes from './routes/admin.js'; // Rotas administrativas
import path from 'path';
import { fileURLToPath } from 'url'; // Importando fileURLToPath

const app = express();

// Obtendo o caminho do diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Conectar ao banco de dados
connectDB().then(() => {
  console.log('MongoDB conectado com sucesso');
}).catch(err => {
  console.error('Erro ao conectar ao MongoDB:', err.message);
  process.exit(1); // Saia do processo em caso de erro na conexão
});

// Middleware
app.use(cors()); // Habilitar CORS para permitir requisições de diferentes origens
app.use(bodyParser.json()); // Para analisar o corpo das requisições como JSON

// Servir arquivos estáticos da pasta public/uploads
app.use('/uploads', express.static(path.join(__dirname, '../../frontend/website/public/uploads')));

// Montando rotas
app.use('/api/public', publicRoutes); // Rotas públicas
app.use('/api/admin', adminRoutes); // Rotas administrativas

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
