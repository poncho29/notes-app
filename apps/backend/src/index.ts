import express from 'express'
import 'dotenv/config'

const app = express();

app.get('/', (_req, res) => {
  res.send('Hello from backend!')
})

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
