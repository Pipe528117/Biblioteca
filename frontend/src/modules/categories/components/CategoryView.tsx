import React, { useEffect, useState } from 'react';
import { categoryService } from '../services/categoryService';

export const CategoryView: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [nombre, setNombre] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (err) {
      console.error('Error al cargar categorías', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await categoryService.create({ nombre });
      setNombre('');
      fetchCategories();
    } catch (err) {
      alert('Error al crear la categoría');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Gestión de Categorías</h1>

      {/* Formulario */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Nueva Categoría</h2>
        <form onSubmit={handleCreate} className="flex gap-4">
          <input
            type="text"
            placeholder="Nombre de la categoría"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="flex-1 border p-2 rounded"
          />
          <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
            Crear
          </button>
        </form>
      </div>

      {/* Listado */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {loading ? (
          <p className="text-center text-gray-500">Cargando categorías...</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {categories.map((cat) => (
              <li key={cat.id || cat._id} className="py-3 flex justify-between items-center">
                <span className="font-medium text-gray-800">{cat.nombre}</span>
                <span className="text-sm text-gray-400">ID: {cat.id}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};