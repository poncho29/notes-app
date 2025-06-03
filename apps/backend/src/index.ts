import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import { connectToDatabase } from './db/connect';

import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Hello from Notes API!');
})
app.use('/api', routes);

const PORT = process.env.PORT || 4001;

connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
});