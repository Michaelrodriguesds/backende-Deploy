import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './config.js'; // Função para conectar ao banco de dados
import publicRoutes from './routes/public.js'; // Rotas públicas para os usuários verem os procedimentos
import adminRoutes from './routes/admin.js'; // Rotas administrativas para gerenciar os procedimentos
import path from 'path';
import { fileURLToPath } from 'url'; // Importando fileURLToPath para lidar com caminhos de arquivos

const app = express(); // Inicializando o app com express

// Obtendo o caminho do diretório atual, necessário para servir arquivos estáticos corretamente
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Conectar ao banco de dados
connectDB().then(() => {
  console.log('MongoDB conectado com sucesso'); // Mensagem ao conectar
}).catch(err => {
  console.error('Erro ao conectar ao MongoDB:', err.message); // Mostra erro no console se falhar
  process.exit(1); // Encerra o processo em caso de erro na conexão com o banco de dados
});

// Middlewares importantes
app.use(cors()); // Habilitar CORS para permitir que o frontend faça requisições para o backend de um domínio diferente
app.use(bodyParser.json()); // Middleware para permitir que o servidor entenda requisições com JSON no corpo


// Montando as rotas
app.use('/api/public', publicRoutes); // Rotas acessíveis publicamente (ex. exibição de procedimentos)
app.use('/api/admin', adminRoutes); // Rotas protegidas, usadas para operações de administrador (criação, edição e remoção de procedimentos)

// Iniciar o servidor e definir a porta
const PORT = process.env.PORT || 5000; // Porta do servidor, com fallback para 5000 se não for definida
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`)); // Mensagem informando que o servidor está funcionando
