import express from 'express'
import 'dotenv/config'

import { connectToDatabase } from './db/connect';

const app = express();

app.get('/', (_req, res) => {
  res.send('Hello from backend!')
})

const PORT = process.env.PORT || 4001;

connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
});