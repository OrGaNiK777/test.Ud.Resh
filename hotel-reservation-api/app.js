import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bookingsRoutes from './routes/bookings.routes.js';
import roomRoutes from './routes/rooms.routes.js';
import userRoutes from './routes/users.routes.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/bookings', bookingsRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

app.listen(PORT, HOST, () => {
  console.log(`Сервер запущен на ${HOST}:${PORT}`);
});
