import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);

import express from 'express';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';
import connectDB from './config/db';
import productRoutes from './Routes/ProductRoutes';

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
}));

app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/api/products`);
});

