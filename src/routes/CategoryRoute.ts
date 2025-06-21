
import express from 'express';
import { CreateCategory,DeleteCategory,GetCategories,UpdateCategory } from '../controllers/CategoryController';

const router = express.Router();
router.post('/', CreateCategory);
router.get('/', GetCategories);
router.put('/:id',UpdateCategory)
router.delete('/:id',DeleteCategory)


export const CategoryRoutes = router;