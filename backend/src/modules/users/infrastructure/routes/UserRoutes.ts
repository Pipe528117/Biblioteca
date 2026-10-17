import { Router, Request, Response, NextFunction } from 'express';
import { UserController } from '../controllers/UserController';
import { UserAdapter } from '../adapters/UserAdapter';
import { CreateUser } from '../../application/use-cases/CreateUser';
import { GetUsers } from '../../application/use-cases/GetUsers';
import { GetUserById } from '../../application/use-cases/GetUserById';
import { UpdateUser } from '../../application/use-cases/UpdateUser';
import { DeleteUser } from '../../application/use-cases/DeleteUser';
import { createUserSchema, updateUserSchema } from '../validations/user-validation';

const adapter = new UserAdapter();
const createUser = new CreateUser(adapter);
const getUsers = new GetUsers(adapter);
const getUserById = new GetUserById(adapter);
const updateUser = new UpdateUser(adapter);
const deleteUser = new DeleteUser(adapter);

const controller = new UserController(
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
);

const validate = (schema: any) => (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ success: false, error: error.details[0].message });
    }
    next();
};

const router = Router();

router.post('/', validate(createUserSchema), (req: Request, res: Response) => controller.create(req, res));
router.get('/', (req: Request, res: Response) => controller.getAll(req, res));
router.get('/:id', (req: Request, res: Response) => controller.getById(req, res));
router.put('/:id', validate(updateUserSchema), (req: Request, res: Response) => controller.update(req, res));
router.delete('/:id', (req: Request, res: Response) => controller.delete(req, res));

export default router;