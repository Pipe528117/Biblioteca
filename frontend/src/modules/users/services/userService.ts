import { api } from '../../../shared/config/api';

export interface User {
  id?: string;
  name: string;
  email: string;
  password?: string; // Agregado para permitir enviar la contraseña en el login o registro
  role?: string;
}

export const userService = {
  // Nueva función de login requerida para la autenticación JWT
  login: async (credentials: { email: string; password: string }) => {
    const res = await api.post('/users/login', credentials);
    return res.data;
  },

  getAll: async (): Promise<User[]> => {
    const res = await api.get('/users');
    return res.data;
  },

  create: async (data: User): Promise<User> => {
    const res = await api.post('/users', data);
    return res.data;
  }
};