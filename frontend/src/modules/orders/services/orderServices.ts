import { api } from '../../../shared/config/api';

export interface Order {
  id?: string;
  userId: string;
  productId: string;
  quantity: number;
  status?: string;
}

export const orderService = {
  getAll: async (): Promise<Order[]> => {
    const res = await api.get('/orders');
    return res.data;
  },
  create: async (data: any): Promise<Order> => { // Cambiado a 'any' para evitar conflictos de tipos desde el formulario
    const res = await api.post('/orders', data);
    return res.data;
  }
};