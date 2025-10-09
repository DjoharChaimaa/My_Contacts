import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8082;

// Servir les fichiers statiques du build Vite
app.use(express.static(path.join(__dirname, 'dist')));

// Route de santé pour vérifier que le serveur fonctionne
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'MyContacts Frontend is running',
    timestamp: new Date().toISOString()
  });
});

// Rediriger TOUTES les autres routes vers index.html (SPA Routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Frontend Server started on port ${PORT}`);
  console.log(`📁 Serving files from: ${path.join(__dirname, 'dist')}`);
  console.log(`🌍 SPA Routing enabled - all paths redirect to index.html`);
  console.log(`❤️  Health check available at: http://localhost:${PORT}/health`);
});