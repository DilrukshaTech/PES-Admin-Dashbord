import express from 'express';
const { CreateProduct,GetProducts  } = require('../controllers/ProductController');

const router = express.Router();
router.post('/', CreateProduct);
router.get('/', GetProducts);

export const ProductRoutes = router;