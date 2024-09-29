import Offer from '../models/offer.js';       // Importação corrigida para minúsculas
import Procedure from '../models/procedure.js'; // Importação corrigida para minúsculas
import Message from '../models/message.js';  // Importação corrigida para minúsculas
import jwt from 'jsonwebtoken';

// Função para login
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (email === 'admin@site.com' && password === '123456') {
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

// Função para aprovar uma mensagem
export const approveMessage = async (req, res) => {
  const { id } = req.params;
  try {
    const message = await Message.findById(id);
    if (!message) {
      return res.status(404).json({ message: 'Mensagem não encontrada' });
    }
    message.approved = true;
    await message.save();
    res.json(message);
  } catch (error) {
    console.error('Erro ao aprovar mensagem:', error.message);
    res.status(500).json({ message: 'Erro ao aprovar mensagem' });
  }
};
