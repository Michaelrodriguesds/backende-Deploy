import mongoose from 'mongoose';

const procedureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  metadata: {
    type: String, // Ou outro tipo que faça sentido
    required: true,
  },
  price: {
    type: Number, // Preço como numérico
    required: true,
  },
  image: {
    type: String, // URL ou caminho da imagem
    default: 'img_procedimentos/default.png', // Caminho padrão para a imagem
  },
});

const Procedure = mongoose.model('Procedure', procedureSchema);
export default Procedure;
