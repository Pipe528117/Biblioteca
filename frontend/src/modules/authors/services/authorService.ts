import { api } from '../../../shared/config/api';

export interface Author {
  id?: string;
  name: string;
  bio?: string;
}

export const authorService = {
  getAll: async (): Promise<Author[]> => {
    const res = await api.get('/authors');
    return res.data;
  },
  create: async (data: Author): Promise<Author> => {
    const res = await api.post('/authors', data);
    return res.data;
  }
};