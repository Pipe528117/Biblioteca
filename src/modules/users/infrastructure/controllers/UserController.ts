import { Request, Response } from 'express';
import { CreateUser } from '../../application/use-cases/CreateUser';
import { GetUsers } from '../../application/use-cases/GetUsers';
import { GetUserById } from '../../application/use-cases/GetUserById';
import { UpdateUser } from '../../application/use-cases/UpdateUser';
import { DeleteUser } from '../../application/use-cases/DeleteUser';

export class UserController {
    constructor(
        private createUserUseCase: CreateUser,
        private getUsersUseCase: GetUsers,
        private getUserByIdUseCase: GetUserById,
        private updateUserUseCase: UpdateUser,
        private deleteUserUseCase: DeleteUser
    ) {}

    async create(req: Request, res: Response): Promise<void> {
        try {
            const user = await this.createUserUseCase.execute(req.body);
            res.status(201).json({ success: true, data: user });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.getUsersUseCase.execute();
            res.status(200).json({ success: true, data: users });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async getById(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            const user = await this.getUserByIdUseCase.execute(id);
            res.status(200).json({ success: true, data: user });
        } catch (error: any) {
            res.status(404).json({ success: false, message: error.message });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            const updated = await this.updateUserUseCase.execute(id, req.body);
            res.status(200).json({ success: true, data: updated });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            await this.deleteUserUseCase.execute(id);
            res.status(200).json({ success: true, message: 'Usuario inactivado correctamente (Borrado Lógico).' });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
}