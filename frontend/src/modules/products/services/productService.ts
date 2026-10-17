import { api } from '../../../shared/config/api';

export interface Product {
  id?: string;
  name: string;
  price: number;
  stock: number;
  is_active?: boolean;
}

export const productService = {
  getAll: async (): Promise<Product[]> => {
    const response = await api.get('/products');
    return response.data;
  },

 // Asegúrate de que el método create acepte 'any' o las propiedades que maneja tu backend (name/nombre)
create: async (data: any): Promise<any> => {
  const res = await api.post('/products', data);
  return res.data;
},

  deleteLogical: async (id: string): Promise<void> => {
    await api.delete(`/products/${id}`);
  }
};