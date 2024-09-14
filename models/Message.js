import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  stars: {
    type: Number,
    required: true,
  },
  approved: {
    type: Boolean,
    default: false, // Isso pode ser removido ou alterado conforme necessário
  },
});

const Message = mongoose.model('Message', messageSchema);
export default Message;
