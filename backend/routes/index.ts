import { Router } from 'express';
//import { authRouter } from './auth';
import { productsRouter } from './products';
//import { authenticate } from '../middleware/auth';

export const router = Router();

router.use('/products' , productsRouter);