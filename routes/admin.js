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
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login);
router.post('/offer', auth, addOffer);
router.delete('/offer/:id', auth, deleteOffer);
router.post('/procedure', auth, addProcedure);
router.delete('/procedure/:id', auth, deleteProcedure);
router.post('/message', auth, addMessage);  // Adicionando a rota para adicionar mensagem
router.put('/message/:id/approve', auth, approveMessage);
router.delete('/message/:id', auth, deleteMessage);
router.get('/messages', auth, getMessages);

export default router;
