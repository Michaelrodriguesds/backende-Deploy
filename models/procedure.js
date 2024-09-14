import mongoose from 'mongoose';

const procedureSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number, // Preço como numérico
    required: true,
  },
});

const Procedure = mongoose.model('Procedure', procedureSchema);
export default Procedure;
