import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/ports/UserRepository';
export class AuthUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async register(userData: User): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('El correo electrónico ya está registrado.');
    }

    const hashedPassword = await bcrypt.hash(userData.password!, 10);
    return await this.userRepository.create({
      ...userData,
      password: hashedPassword
    });
  }

  async login(email: string, password: string): Promise<{ token: string; user: User }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Credenciales inválidas.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password!);
    if (!isPasswordValid) {
      throw new Error('Credenciales inválidas.');
    }

    const secret = process.env.JWT_SECRET || 'secret';
    const token = jwt.sign(
      { id: user.id, email: user.email, rol: user.rol },
      secret,
      { expiresIn: '8h' }
    );

    delete user.password;
    return { token, user };
  }
}