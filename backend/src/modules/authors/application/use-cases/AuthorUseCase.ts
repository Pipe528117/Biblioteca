import { Author } from '../../domain/entities/Author';
import { AuthorRepository } from '../../domain/ports/AuthorRepository';

export class AuthorUseCase {
  constructor(private readonly authorRepository: AuthorRepository) {}

  async createAuthor(author: Author): Promise<Author> {
    if (!author.nombre) throw new Error('El nombre del autor es obligatorio.');
    return await this.authorRepository.create(author);
  }

  async getAllAuthors(): Promise<Author[]> {
    return await this.authorRepository.findAll();
  }

  async getAuthorById(id: number): Promise<Author> {
    const author = await this.authorRepository.findById(id);
    if (!author) throw new Error('Autor no encontrado.');
    return author;
  }

  async updateAuthor(id: number, authorData: Partial<Author>): Promise<Author> {
    const updated = await this.authorRepository.update(id, authorData);
    if (!updated) throw new Error('No se pudo actualizar el autor.');
    return updated;
  }

  async deleteAuthor(id: number): Promise<void> {
    const deleted = await this.authorRepository.delete(id);
    if (!deleted) throw new Error('No se pudo eliminar el autor.');
  }
}