import { UserPort } from '../../domain/ports/UserPort';
import { User } from '../../domain/entities/User';

export class GetUserById {
    constructor(private readonly userPort: UserPort) {}

    async execute(id: number): Promise<User> {
        const user = await this.userPort.findById(id);
        if (!user) {
            throw new Error(`Usuario con ID ${id} no encontrado.`);
        }
        return user;
    }
}