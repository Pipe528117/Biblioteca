import { api } from '../../../shared/config/api';

export interface Category {
  id?: string;
  name: string;
  description?: string;
}

export const categoryService = {
  getAll: async (): Promise<Category[]> => {
    const res = await api.get('/categories');
    return res.data;
  },
  create: async (data: any): Promise<Category> => { // Cambiado a 'any' para aceptar cualquier objeto del formulario
    const res = await api.post('/categories', data);
    return res.data;
  }
};