import mongoose from 'mongoose';

// Definição do esquema para as ofertas
const offerSchema = new mongoose.Schema({
  nome: { // Nome da oferta
    type: String,
    required: true, // Apenas o nome é obrigatório
  },
  descricao: { // Descrição da oferta (opcional)
    type: String,
    required: false, // Opcional
  },
  valor: { // Valor da oferta (opcional)
    type: Number,
    required: false, // Opcional
  },
  data_inicio: { // Data de início da oferta (opcional)
    type: Date,
    required: false, // Opcional
  },
  data_fim: { // Data de término da oferta (opcional)
    type: Date,
    required: false, // Opcional
  },
  imagem: { // URL da imagem da oferta (opcional)
    type: String,
    required: false, // Opcional
  },
}, {
  versionKey: false, // Remove a propriedade __v que o Mongoose adiciona por padrão
});

// Criação do modelo baseado no esquema
const Offer = mongoose.model('Offer', offerSchema);

// Exportando o modelo para uso em outros arquivos
export default Offer;
