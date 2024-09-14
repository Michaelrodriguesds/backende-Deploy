import Offer from '../models/Offer.js'; // Modelo de dados de ofertas
import Procedure from '../models/Procedure.js'; // Modelo de dados de procedimentos
import Message from '../models/Message.js'; // Modelo de dados de mensagens

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
    const messages = await Message.find({ approved: true }); // Filtra mensagens aprovadas
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

// Função para adicionar uma oferta
export const addOffer = async (req, res) => {
  try {
    // Verifique se todos os campos estão presentes no corpo da requisição
    const { title, description, price, expiresAt } = req.body;

    // Crie uma nova oferta com os campos obrigatórios
    const newOffer = new Offer({ title, description, price, expiresAt });
    
    // Salva a nova oferta no banco de dados
    await newOffer.save();

    // Responde com o status de sucesso e a nova oferta criada
    res.status(201).json(newOffer);
  } catch (error) {
    // Captura o erro e envia uma resposta ao cliente
    console.error('Erro ao adicionar oferta:', error.message);
    res.status(500).json({ message: 'Erro ao adicionar oferta' });
  }
};
