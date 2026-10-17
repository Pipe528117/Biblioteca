import { UserPort } from '../../domain/ports/UserPort';
import { User } from '../../domain/entities/User';

export class GetUsers {
    constructor(private readonly userPort: UserPort) {}

    async execute(): Promise<User[]> {
        return await this.userPort.findAll();
    }
}