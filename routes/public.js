import express from 'express';
import { getOffers, getProcedures, getMessages, postMessage } from '../controllers/publicController.js';

const router = express.Router();

router.get('/offers', getOffers);
router.get('/procedures', getProcedures);
router.get('/messages', getMessages);
router.post('/messages', postMessage);

export default router;
