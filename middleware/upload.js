import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Caminho da pasta no frontend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendUploadsPath = path.join(__dirname, '../../frontend/website/public/uploads/procedures/');

// Verificar se o diretório no frontend existe, se não, criar
if (!fs.existsSync(frontendUploadsPath)) {
  fs.mkdirSync(frontendUploadsPath, { recursive: true });
}

// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, frontendUploadsPath); // Define o diretório de upload no frontend
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Nome único para cada arquivo
  }
});

const upload = multer({ storage });

export default upload;
