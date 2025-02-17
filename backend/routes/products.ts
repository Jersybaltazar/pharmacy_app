import { Router, Request, Response } from 'express'; 
import { ProductController } from '../controllers/product.controller';
//import { AuthenticatedRequest } from '../types/custom'; 

const router = Router();

router.post("/", ProductController.createProduct);
router.get("/", ProductController.getProducts);
router.get("/:id", ProductController.getProduct);
router.put("/:id", ProductController.updateProduct);
router.delete("/:id", ProductController.deleteProduct);
export const productsRouter = router;