import mongoose from 'mongoose';

// Definição do esquema (schema) para procedimentos
const procedureSchema = new mongoose.Schema({
  name: {
    type: String,   // Nome do procedimento
    required: true, // Campo obrigatório
  },
  metadata: {
    type: String,   // Metadados adicionais (pode ser descrição, categoria, etc.)
    required: true, // Campo obrigatório
  },
  price: {
    type: Number,   // Preço do procedimento, armazenado como número
    required: true, // Campo obrigatório
  },
  image: {
    type: String,   // Armazena a URL da imagem do procedimento
    default: 'img_procedimentos/default.png', // Caminho padrão da imagem caso nenhum seja fornecido
    // Remover a obrigatoriedade do campo `image`
  },
});

// Criação do modelo a partir do esquema definido
const Procedure = mongoose.model('Procedure', procedureSchema);

export default Procedure;
