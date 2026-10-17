import { Category } from '../../domain/entities/Category';
import { CategoryRepository } from '../../domain/ports/CategoryRepository';

export class CategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async createCategory(category: Category): Promise<Category> {
    if (!category.nombre) throw new Error('El nombre de la categoría es obligatorio.');
    return await this.categoryRepository.create(category);
  }

  async getAllCategories(): Promise<Category[]> {
    return await this.categoryRepository.findAll();
  }

  async getCategoryById(id: number): Promise<Category> {
    const category = await this.categoryRepository.findById(id);
    if (!category) throw new Error('Categoría no encontrada.');
    return category;
  }

  async updateCategory(id: number, categoryData: Partial<Category>): Promise<Category> {
    const updated = await this.categoryRepository.update(id, categoryData);
    if (!updated) throw new Error('No se pudo actualizar la categoría.');
    return updated;
  }

  async deleteCategory(id: number): Promise<void> {
    const deleted = await this.categoryRepository.delete(id);
    if (!deleted) throw new Error('No se pudo eliminar la categoría.');
  }
}