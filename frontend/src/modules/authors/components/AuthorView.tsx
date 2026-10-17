import React, { useEffect, useState } from 'react';
import { authorService } from '../services/authorService';

export const AuthorView: React.FC = () => {
  const [authors, setAuthors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [nombre, setNombre] = useState('');

  const fetchAuthors = async () => {
    try {
      setLoading(true);
      const data = await authorService.getAll();
      setAuthors(data);
    } catch (err) {
      console.error('Error al cargar autores', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authorService.create({ name: nombre });
      setNombre('');
      fetchAuthors();
    } catch (err) {
      alert('Error al registrar autor');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Gestión de Autores</h2>

      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-emerald-400">Agregar Autor</h3>
        <form onSubmit={handleCreate} className="flex gap-4">
          <input
            type="text"
            placeholder="Nombre completo del autor"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="flex-1 bg-gray-900 border border-gray-700 text-white p-2.5 rounded-lg focus:outline-none focus:border-emerald-500"
          />
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
          >
            Guardar
          </button>
        </form>
      </div>

      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        {loading ? (
          <p className="text-center text-gray-400">Cargando autores...</p>
        ) : (
          <ul className="divide-y divide-gray-700">
            {authors.map((a: any) => (
              <li key={a.id || a._id} className="py-3 flex justify-between items-center text-gray-300">
                <span className="font-medium text-white">{a.name || a.nombre}</span>
                <span className="text-xs font-mono text-gray-500">ID: {a.id || a._id}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};