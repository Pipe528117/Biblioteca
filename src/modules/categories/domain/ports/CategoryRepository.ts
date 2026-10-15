import { Category } from '../entities/Category';

export interface CategoryRepository {
  create(category: Category): Promise<Category>;
  findAll(): Promise<Category[]>;
  findById(id: number): Promise<Category | null>;
  update(id: number, category: Partial<Category>): Promise<Category | null>;
  delete(id: number): Promise<boolean>;
}