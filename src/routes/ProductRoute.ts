import express from 'express';
const { CreateProduct,GetProducts,GetProductById,UpdateProduct,DeleteProduct  } = require('../controllers/ProductController');

const router = express.Router();
router.post('/', CreateProduct);
router.get('/', GetProducts);
router.get('/:id', GetProductById);
router.put('/:id', UpdateProduct); 
router.delete('/:id',DeleteProduct)

export const ProductRoutes = router;