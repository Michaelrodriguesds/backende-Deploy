import express from 'express';
import { login, addOffer, deleteOffer, approveMessage } from '../controllers/adminController.js';

const router = express.Router();

// Rotas administrativas
router.post('/login', login);
router.post('/offers', addOffer);
router.delete('/offers/:id', deleteOffer);
router.post('/messages/approve/:id', approveMessage);

export default router;
