import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { productRoutes } from './src/app/modules/product/product.route';
import { OrderRoutes } from './src/app/modules/orders/order.route';

// Load environment variables from .env file
dotenv.config({ path: path.join(process.cwd(), ".env") });

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', OrderRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

// Handle 404 - Keep this as a last route
app.use((req, res) => {
  res.status(404).send('404: Not Found');
});

export default app;
