import { Router, Request, Response, NextFunction } from 'express';
import { OrderController } from '../controllers/OrderController';
import { OrderAdapter } from '../adapters/OrderAdapter';
import { CreateOrder } from '../../application/use-cases/CreateOrder';
import { GetOrders } from '../../application/use-cases/GetOrders';
import { GetOrderById } from '../../application/use-cases/GetOrderById';
import { UpdateOrder } from '../../application/use-cases/UpdateOrder';
import { DeleteOrder } from '../../application/use-cases/DeleteOrder';
import { ReturnProduct } from '../../application/use-cases/ReturnProduct';
import { createOrderSchema, updateOrderSchema } from '../validations/order-validation';

const adapter = new OrderAdapter();
const createOrder = new CreateOrder(adapter);
const getOrders = new GetOrders(adapter);
const getOrderById = new GetOrderById(adapter);
const updateOrder = new UpdateOrder(adapter);
const deleteOrder = new DeleteOrder(adapter);
const returnProduct = new ReturnProduct(adapter);

const controller = new OrderController(
    createOrder,
    getOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
    returnProduct
);

const validate = (schema: any) => (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ success: false, error: error.details[0].message });
    }
    next();
};

const router = Router();

router.post('/', validate(createOrderSchema), (req: Request, res: Response) => controller.create(req, res));
router.get('/', (req: Request, res: Response) => controller.getAll(req, res));
router.get('/:id', (req: Request, res: Response) => controller.getById(req, res));
router.put('/:id', validate(updateOrderSchema), (req: Request, res: Response) => controller.update(req, res));
router.delete('/:id', (req: Request, res: Response) => controller.delete(req, res));
router.post('/:id/devolucion', (req: Request, res: Response) => controller.returnProduct(req, res));

export default router;