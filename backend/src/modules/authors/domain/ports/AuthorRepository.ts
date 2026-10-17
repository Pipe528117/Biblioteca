import { Author } from '../entities/Author';

export interface AuthorRepository {
  create(author: Author): Promise<Author>;
  findAll(): Promise<Author[]>;
  findById(id: number): Promise<Author | null>;
  update(id: number, author: Partial<Author>): Promise<Author | null>;
  delete(id: number): Promise<boolean>;
}