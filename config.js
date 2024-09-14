import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB conectado com sucesso');
  } catch (error) {
    console.error('Erro ao conectar no MongoDB: ', error);
    process.exit(1); // Para o servidor se houver falha
  }
};

export default connectDB;
