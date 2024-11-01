import Offer from '../models/offer.js';       
import Procedure from '../models/procedure.js'; 
import Message from '../models/message.js';  
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Carregar variáveis de ambiente do arquivo .env

// Função para login de administrador
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

  // Verifica se o usuário e senha correspondem
  const user = users.find(user => user.email === email && user.password === password);

  if (user) {
    // Gera um token JWT válido por 1 hora
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Credenciais inválidas' });
  }
};

// Função para adicionar uma oferta
export const addOffer = async (req, res) => {
  try {
    // Desestrutura os campos que correspondem ao modelo
    const { nome, descricao, valor, data_inicio, data_fim, imagem } = req.body;

    const newOffer = new Offer({ 
      nome, 
      descricao, 
      valor, 
      data_inicio, 
      data_fim, 
      imagem 
    });

    await newOffer.save();
    res.status(201).json(newOffer); // Responde com a nova oferta criada
  } catch (error) {
    console.error('Erro ao adicionar oferta:', error.message);
    res.status(500).json({ message: 'Erro ao adicionar oferta' });
  }
};

// Função para excluir uma oferta
export const deleteOffer = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Offer.findByIdAndDelete(id); // Encontra e exclui a oferta pelo ID
    if (!result) {
      return res.status(404).json({ message: 'Oferta não encontrada' });
    }
    res.status(204).end(); // Retorna status 204 sem conteúdo
  } catch (error) {
    console.error('Erro ao excluir oferta:', error.message);
    res.status(500).json({ message: 'Erro ao excluir oferta' });
  }
};

// Função para adicionar um procedimento
export const addProcedure = async (req, res) => {
  try {
    const { name, metadata, price, image } = req.body; // Lê os campos do corpo da requisição

    // Verifica se os campos obrigatórios estão presentes
    if (!name || !metadata || !price) {
      return res.status(400).json({ message: 'Os campos name, metadata e price são obrigatórios.' });
    }

    // Verifica se a URL da imagem foi fornecida, se não, usa a imagem padrão
    const procedureImage = image || 'img_procedimentos/default.png';

    const newProcedure = new Procedure({
      name,
      metadata,
      price,
      image: procedureImage // Usa a URL fornecida ou a imagem padrão
    });

    await newProcedure.save();
    res.status(201).json(newProcedure); // Retorna o procedimento criado
  } catch (error) {
    console.error('Erro ao adicionar procedimento:', error); // Log detalhado do erro
    res.status(500).json({ message: 'Erro ao adicionar procedimento', error: error.message });
  }
};



// Função para excluir um procedimento
export const deleteProcedure = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Procedure.findByIdAndDelete(id); // Encontra e exclui o procedimento pelo ID
    if (!result) {
      return res.status(404).json({ message: 'Procedimento não encontrado' });
    }
    res.status(204).end(); // Retorna status 204 sem conteúdo
  } catch (error) {
    console.error('Erro ao excluir procedimento:', error.message);
    res.status(500).json({ message: 'Erro ao excluir procedimento' });
  }
};

// Função para aprovar uma mensagem
export const approveMessage = async (req, res) => {
  const { id } = req.params;
  
  try {
    const message = await Message.findById(id); // Encontra a mensagem pelo ID
    if (!message) {
      return res.status(404).json({ message: 'Mensagem não encontrada' });
    }
    message.approved = true; // Marca a mensagem como aprovada
    await message.save();
    res.json(message); // Retorna a mensagem aprovada
  } catch (error) {
    console.error('Erro ao aprovar mensagem:', error.message);
    res.status(500).json({ message: 'Erro ao aprovar mensagem' });
  }
};

// Função para excluir uma mensagem
export const deleteMessage = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Message.findByIdAndDelete(id); // Encontra e exclui a mensagem pelo ID
    if (!result) {
      return res.status(404).json({ message: 'Mensagem não encontrada' });
    }
    res.status(204).end(); // Retorna status 204 sem conteúdo
  } catch (error) {
    console.error('Erro ao excluir mensagem:', error.message);
    res.status(500).json({ message: 'Erro ao excluir mensagem' });
  }
};

// Função para listar mensagens com base no status de aprovação
export const getMessages = async (req, res) => {
  const { approved } = req.query;
  const filter = approved === 'false' ? { approved: false } : {}; // Filtra mensagens não aprovadas se necessário
  try {
    const messages = await Message.find(filter); // Busca as mensagens no banco de dados
    res.json(messages); // Retorna a lista de mensagens
  } catch (error) {
    console.error('Erro ao obter mensagens:', error.message);
    res.status(500).json({ message: 'Erro ao obter mensagens' });
  }
};

// Função para adicionar uma mensagem
export const addMessage = async (req, res) => {
  try {
    const { name, content, stars } = req.body;
    
    // Cria uma nova mensagem com as informações fornecidas
    const newMessage = new Message({ name, content, stars });
    await newMessage.save(); // Salva a nova mensagem no banco de dados

    res.status(201).json(newMessage); // Retorna a mensagem criada
  } catch (error) {
    console.error('Erro ao adicionar mensagem:', error.message);
    res.status(500).json({ message: 'Erro ao adicionar mensagem' });
  }
};
