import { Router, Request, Response, NextFunction } from 'express';
import { ProductController } from '../controllers/ProductController';
import { ProductAdapter } from '../adapters/ProductAdapter';
import { CreateProduct } from '../../application/use-cases/CreateProduct';
import { GetProducts } from '../../application/use-cases/GetProducts';
import { GetProductById } from '../../application/use-cases/GetProductById';
import { UpdateProduct } from '../../application/use-cases/UpdateProduct';
import { DeleteProduct } from '../../application/use-cases/DeleteProduct';
import { UpdateProductStock } from '../../application/use-cases/UpdateProductStock';
import { createProductSchema, updateProductSchema } from '../validations/product-validation';

const adapter = new ProductAdapter();
const createProduct = new CreateProduct(adapter);
const getProducts = new GetProducts(adapter);
const getProductById = new GetProductById(adapter);
const updateProduct = new UpdateProduct(adapter);
const deleteProduct = new DeleteProduct(adapter);
const updateStock = new UpdateProductStock(adapter);

const controller = new ProductController(
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    updateStock
);

const validate = (schema: any) => (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ success: false, error: error.details[0].message });
    }
    next();
};

const router = Router();

router.post('/', validate(createProductSchema), (req: Request, res: Response) => controller.create(req, res));
router.get('/', (req: Request, res: Response) => controller.getAll(req, res));
router.get('/:id', (req: Request, res: Response) => controller.getById(req, res));
router.put('/:id', validate(updateProductSchema), (req: Request, res: Response) => controller.update(req, res));
router.delete('/:id', (req: Request, res: Response) => controller.delete(req, res));
router.patch('/:id/stock', (req: Request, res: Response) => controller.updateStock(req, res));

export default router;