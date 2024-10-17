import express from 'express';
import {
  login,
  addOffer,
  addProcedure,
  approveMessage,
  deleteOffer,
  deleteProcedure,
  deleteMessage,
  getMessages,
  addMessage
} from '../controllers/adminController.js';
import auth from '../middleware/auth.js'; // Middleware para autenticação de rotas

const router = express.Router(); // Inicializando o roteador

// Route for user login
router.post('/login', login); // Rota para login de administrador

// Routes for offers
router.post('/offer', auth, addOffer);              // Rota para adicionar uma nova oferta (proteção de autenticação)
router.delete('/offer/:id', auth, deleteOffer);     // Rota para deletar uma oferta por ID


router.post('/procedure', auth, addProcedure);      
router.delete('/procedure/:id', auth, deleteProcedure); // Rota para deletar um procedimento por ID

// Routes for messages
router.post('/message', auth, addMessage);          // Rota para adicionar uma nova mensagem
router.put('/message/:id/approve', auth, approveMessage); // Rota para aprovar uma mensagem por ID
router.delete('/message/:id', auth, deleteMessage); // Rota para deletar uma mensagem por ID
router.get('/messages', auth, getMessages);         // Rota para listar todas as mensagens

export default router;
