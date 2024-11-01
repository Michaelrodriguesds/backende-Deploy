import Offer from '../models/offer.js';       
import Procedure from '../models/procedure.js';
import Message from '../models/message.js';

// Função para obter ofertas
export const getOffers = async (req, res) => {
  try {
    const offers = await Offer.find().lean();  // `.lean()` para uma resposta rápida sem overhead
    res.json(offers.map(offer => ({
      ...offer,
      descricao: offer.descricao || "Descrição não disponível",
      valor: offer.valor || 0,
      data_inicio: offer.data_inicio || null,
      data_fim: offer.data_fim || null,
      imagem: offer.imagem || "img_default/default_offer.png"  // Define uma imagem padrão
    })));
  } catch (error) {
    console.error('Erro ao obter ofertas:', error.message);
    res.status(500).json({ message: 'Erro ao obter ofertas' });
  }
};

// Função para obter procedimentos
export const getProcedures = async (req, res) => {
  try {
    const procedures = await Procedure.find().lean();
    res.status(200).json(procedures.map(procedure => ({
      ...procedure,
      image: procedure.image || 'img_procedimentos/default.png'  // Define uma imagem padrão para procedimentos
    })));
  } catch (error) {
    console.error('Erro ao obter procedimentos:', error.message);
    res.status(500).json({ message: 'Erro ao obter procedimentos.' });
  }
};

// Função para obter mensagens
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ approved: true }).lean();
    res.json(messages);
  } catch (error) {
    console.error('Erro ao obter mensagens:', error.message);
    res.status(500).json({ message: 'Erro ao obter mensagens' });
  }
};

// Função para postar uma mensagem
export const postMessage = async (req, res) => {
  const { name, content, stars } = req.body;

  // Validação básica
  if (!name || !content || !Number.isInteger(stars) || stars < 1 || stars > 5) {
    return res.status(400).json({ message: 'Preencha todos os campos corretamente: nome, conteúdo e uma pontuação de 1 a 5.' });
  }

  try {
    const newMessage = new Message({ name, content, stars });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Erro ao postar mensagem:', error.message);
    res.status(500).json({ message: 'Erro ao postar mensagem' });
  }
};
