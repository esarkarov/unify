import cors from 'cors';
import express from 'express';

const app = express();
const PORT = 8000;

app.use(
  cors({
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    origin: process.env.FRONTEND_URL,
  })
);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
