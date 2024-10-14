import Offer from '../models/offer.js';       
import Procedure from '../models/procedure.js'; 
import Message from '../models/message.js';  
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config(); // Carregar variáveis de ambiente

// Função para login
export const login = async (req, res) => {
  const { email, password } = req.body;

  // Credenciais dos usuários autorizados a partir do .env
  const users = [
    {
      email: process.env.USER_EMAIL_1,
      password: process.env.USER_PASSWORD_1
    },
    {
      email: process.env.USER_EMAIL_2,
      password: process.env.USER_PASSWORD_2
    }
  ];

  const user = users.find(user => user.email === email && user.password === password);

  if (user) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Credenciais inválidas' });
  }
};

// Função para adicionar uma oferta
export const addOffer = async (req, res) => {
  try {
    const { title, description, price, expiresAt } = req.body;
    const newOffer = new Offer({ title, description, price, expiresAt });
    await newOffer.save();
    res.status(201).json(newOffer);
  } catch (error) {
    console.error('Erro ao adicionar oferta:', error.message);
    res.status(500).json({ message: 'Erro ao adicionar oferta' });
  }
};

// Função para excluir uma oferta
export const deleteOffer = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Offer.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: 'Oferta não encontrada' });
    }
    res.status(204).end();
  } catch (error) {
    console.error('Erro ao excluir oferta:', error.message);
    res.status(500).json({ message: 'Erro ao excluir oferta' });
  }
};

// Função para adicionar um procedimento
export const addProcedure = async (req, res) => {
  try {
    const { name, metadata, price } = req.body; // Lê o nome, metadata e preço do corpo da requisição
    const image = req.file ? `/uploads/procedures/${req.file.filename}` : '/uploads/procedures/default.png'; // Caminho público da imagem para o frontend

    // Verifique se os campos obrigatórios estão presentes
    if (!name || !metadata || !price) {
      return res.status(400).json({ message: 'Todos os campos (name, metadata, price) são obrigatórios.' });
    }

    const newProcedure = new Procedure({
      name,
      metadata,
      price,
      image
    });
    await newProcedure.save();

    res.status(201).json(newProcedure);
  } catch (error) {
    console.error('Erro ao adicionar procedimento:', error.message);
    res.status(500).json({ message: 'Erro ao adicionar procedimento' });
  }
};

// Função para excluir um procedimento
export const deleteProcedure = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Procedure.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: 'Procedimento não encontrado' });
    }
    res.status(204).end();
  } catch (error) {
    console.error('Erro ao excluir procedimento:', error.message);
    res.status(500).json({ message: 'Erro ao excluir procedimento' });
  }
};

// Função para aprovar mensagem
export const approveMessage = async (req, res) => {
  const { id } = req.params;
  
  try {
      const message = await Message.findById(id);
      if (!message) {
          return res.status(404).json({ message: 'Mensagem não encontrada' });
      }
      message.approved = true; // Muda o status para aprovado
      await message.save(); // Salva a mudança no banco de dados
      res.json(message);
  } catch (error) {
      console.error('Erro ao aprovar mensagem:', error.message);
      res.status(500).json({ message: 'Erro ao aprovar mensagem' });
  }
}

// Função para excluir uma mensagem
export const deleteMessage = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Message.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: 'Mensagem não encontrada' });
    }
    res.status(204).end();
  } catch (error) {
    console.error('Erro ao excluir mensagem:', error.message);
    res.status(500).json({ message: 'Erro ao excluir mensagem' });
  }
};

// Função para listar recados com base no status de aprovação
export const getMessages = async (req, res) => {
  const { approved } = req.query;
  const filter = approved === 'false' ? { approved: false } : {};
  try {
    const messages = await Message.find(filter);
    res.json(messages);
  } catch (error) {
    console.error('Erro ao obter mensagens:', error.message);
    res.status(500).json({ message: 'Erro ao obter mensagens' });
  }
};

// Função para adicionar uma mensagem
export const addMessage = async (req, res) => {
  try {
    const { name, content, stars } = req.body;
    const newMessage = new Message({ name, content, stars });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Erro ao adicionar mensagem:', error.message);
    res.status(500).json({ message: 'Erro ao adicionar mensagem' });
  }
};
