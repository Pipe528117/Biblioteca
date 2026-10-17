import { pool } from '../../../../shared/config/database';
import { User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/ports/UserRepository';

export class PgUserRepository implements UserRepository {
  async create(user: User): Promise<User> {
    const query = `
      INSERT INTO users (nombre, email, password, rol)
      VALUES ($1, $2, $3, $4)
      RETURNING id, nombre, email, rol, created_at;
    `;
    const values = [user.nombre, user.email, user.password, user.rol || 'usuario'];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async findByEmail(email: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE email = $1;';
    const result = await pool.query(query, [email]);
    return result.rows[0] || null;
  }

  async findById(id: number): Promise<User | null> {
    const query = 'SELECT id, nombre, email, rol, created_at FROM users WHERE id = $1;';
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }
}