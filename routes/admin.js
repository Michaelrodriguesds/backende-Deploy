// backend/routes/admin.js

import express from 'express';
import upload from '../middleware/upload.js'; // Importando o middleware de upload corretamente
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

// Route for user login
router.post('/login', login);

// Routes for offers
router.post('/offer', auth, addOffer);              // Add offer
router.delete('/offer/:id', auth, deleteOffer);     // Delete offer by ID

// Routes for procedures
router.post('/procedure', auth, upload.single('image'), addProcedure);  // Add procedure com upload de imagem
router.delete('/procedure/:id', auth, deleteProcedure); // Delete procedure by ID

// Routes for messages
router.post('/message', auth, addMessage);          // Add message
router.put('/message/:id/approve', auth, approveMessage); // Approve message by ID
router.delete('/message/:id', auth, deleteMessage); // Delete message by ID
router.get('/messages', auth, getMessages);         // Get all messages

export default router;
