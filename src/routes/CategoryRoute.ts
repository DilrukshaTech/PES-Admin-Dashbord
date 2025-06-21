
import express from 'express';
import { CreateCategory } from '../controllers/CategoryController';

const router = express.Router();
router.post('/', CreateCategory);

export const CategoryRoutes = router;