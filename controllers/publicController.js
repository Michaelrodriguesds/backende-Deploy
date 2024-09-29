import Offer from '../models/offer.js';      // Importação corrigida para minúsculas
import Procedure from '../models/procedure.js'; // Importação corrigida para minúsculas
import Message from '../models/message.js';  // Importação corrigida para minúsculas

// Função para obter ofertas
export const getOffers = async (req, res) => {
  try {
    const offers = await Offer.find();
    res.json(offers);
  } catch (error) {
    console.error('Erro ao obter ofertas:', error.message);
    res.status(500).json({ message: 'Erro ao obter ofertas' });
  }
};

// Função para obter procedimentos
export const getProcedures = async (req, res) => {
  try {
    const procedures = await Procedure.find();
    res.json(procedures);
  } catch (error) {
    console.error('Erro ao obter procedimentos:', error.message);
    res.status(500).json({ message: 'Erro ao obter procedimentos' });
  }
};

// Função para obter mensagens
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ approved: true });
    res.json(messages);
  } catch (error) {
    console.error('Erro ao obter mensagens:', error.message);
    res.status(500).json({ message: 'Erro ao obter mensagens' });
  }
};

// Função para postar uma mensagem
export const postMessage = async (req, res) => {
  const { name, content, stars } = req.body;
  try {
    const newMessage = new Message({ name, content, stars });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Erro ao postar mensagem:', error.message);
    res.status(500).json({ message: 'Erro ao postar mensagem' });
  }
};
