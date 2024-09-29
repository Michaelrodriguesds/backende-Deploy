import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './config.js';
import publicRoutes from './routes/public.js';
import adminRoutes from './routes/admin.js';

const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/public', publicRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
