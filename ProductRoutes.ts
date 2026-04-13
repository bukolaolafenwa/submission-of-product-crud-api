import { Router } from 'express';
import { createProduct, getAllProducts, getASingleProduct, updateProduct, deleteProduct } from "../controllers/ProductControlllers"

const router = Router();

router.post('/', createProduct);
router.get('/', getAllProducts);
router.get('/:id', getASingleProduct);
router.patch('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
