import { pool } from '../../../../shared/config/database';
import { Category } from '../../domain/entities/Category';
import { CategoryRepository } from '../../domain/ports/CategoryRepository';

export class PgCategoryRepository implements CategoryRepository {
  async create(category: Category): Promise<Category> {
    const query = `
      INSERT INTO categories (nombre, descripcion)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const result = await pool.query(query, [category.nombre, category.descripcion || '']);
    return result.rows[0];
  }

  async findAll(): Promise<Category[]> {
    const result = await pool.query('SELECT * FROM categories ORDER BY id DESC;');
    return result.rows;
  }

  async findById(id: number): Promise<Category | null> {
    const result = await pool.query('SELECT * FROM categories WHERE id = $1;', [id]);
    return result.rows[0] || null;
  }

  async update(id: number, category: Partial<Category>): Promise<Category | null> {
    const query = `
      UPDATE categories
      SET nombre = COALESCE($1, nombre), descripcion = COALESCE($2, descripcion)
      WHERE id = $3
      RETURNING *;
    `;
    const result = await pool.query(query, [category.nombre, category.descripcion, id]);
    return result.rows[0] || null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM categories WHERE id = $1;', [id]);
    return (result.rowCount ?? 0) > 0;
  }
}