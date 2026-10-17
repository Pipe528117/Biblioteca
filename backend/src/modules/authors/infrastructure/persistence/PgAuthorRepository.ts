import { pool } from '../../../../shared/config/database';
import { Author } from '../../domain/entities/Author';
import { AuthorRepository } from '../../domain/ports/AuthorRepository';

export class PgAuthorRepository implements AuthorRepository {
  async create(author: Author): Promise<Author> {
    const query = `
      INSERT INTO authors (nombre, nacionalidad)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const result = await pool.query(query, [author.nombre, author.nacionalidad || 'Desconocida']);
    return result.rows[0];
  }

  async findAll(): Promise<Author[]> {
    const result = await pool.query('SELECT * FROM authors ORDER BY id DESC;');
    return result.rows;
  }

  async findById(id: number): Promise<Author | null> {
    const result = await pool.query('SELECT * FROM authors WHERE id = $1;', [id]);
    return result.rows[0] || null;
  }

  async update(id: number, author: Partial<Author>): Promise<Author | null> {
    const query = `
      UPDATE authors
      SET nombre = COALESCE($1, nombre), nacionalidad = COALESCE($2, nacionalidad)
      WHERE id = $3
      RETURNING *;
    `;
    const result = await pool.query(query, [author.nombre, author.nacionalidad, id]);
    return result.rows[0] || null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM authors WHERE id = $1;', [id]);
    return (result.rowCount ?? 0) > 0;
  }
}