import React, { useEffect, useState } from 'react';
import { productService } from '../services/productService';

export const ProductView: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados para el formulario de nuevo producto
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAll();
      setProducts(data);
    } catch (err: any) {
      setError('Error al cargar los productos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await productService.create({ nombre, descripcion, precio: Number(precio) });
      setNombre('');
      setDescripcion('');
      setPrecio('');
      fetchProducts(); // Recargar lista
    } catch (err) {
      alert('Error al crear el producto');
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Gestión de Productos (Libros)</h1>

      {/* Formulario de Creación */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Agregar Nuevo Producto</h2>
        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Nombre del libro"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Descripción / ODS"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
            className="border p-2 rounded"
          />
          <button type="submit" className="md:col-span-3 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Guardar Producto
          </button>
        </form>
      </div>

      {/* Tabla de Listado */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {loading ? (
          <p className="p-6 text-center text-gray-500">Cargando productos...</p>
        ) : error ? (
          <p className="p-6 text-center text-red-500">{error}</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 border-b">ID</th>
                <th className="p-3 border-b">Nombre</th>
                <th className="p-3 border-b">Descripción</th>
                <th className="p-3 border-b">Precio</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id || p._id} className="hover:bg-gray-50">
                  <td className="p-3 border-b">{p.id}</td>
                  <td className="p-3 border-b font-medium">{p.nombre}</td>
                  <td className="p-3 border-b">{p.descripcion}</td>
                  <td className="p-3 border-b">${p.precio}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};