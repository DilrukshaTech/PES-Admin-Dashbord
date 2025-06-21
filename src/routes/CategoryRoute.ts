
import express from 'express';
import { CreateCategory,GetCategories,UpdateCategory } from '../controllers/CategoryController';

const router = express.Router();
router.post('/', CreateCategory);
router.get('/', GetCategories);
router.put('/:id',UpdateCategory)


export const CategoryRoutes = router;