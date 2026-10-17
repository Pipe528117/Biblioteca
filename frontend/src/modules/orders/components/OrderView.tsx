import React, { useEffect, useState } from 'react';
import { orderService } from '../services/orderServices';

export const OrderView: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [usuarioId, setUsuarioId] = useState('');
  const [producto, setProducto] = useState('');
  const [monto, setMonto] = useState('');

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await orderService.getAll();
      setOrders(data);
    } catch (err: any) {
      setError('Error al cargar la lista de órdenes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await orderService.create({ userId: usuarioId, product: producto, total: Number(monto) });
      setUsuarioId('');
      setProducto('');
      setMonto('');
      fetchOrders();
    } catch (err) {
      alert('Error al registrar la orden.');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Gestión de Órdenes y Préstamos</h2>

      {/* Formulario */}
      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-emerald-400">Crear Nueva Órden</h3>
        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="ID de Usuario / Solicitante"
            value={usuarioId}
            onChange={(e) => setUsuarioId(e.target.value)}
            required
            className="bg-gray-900 border border-gray-700 text-white p-2.5 rounded-lg focus:outline-none focus:border-emerald-500"
          />
          <input
            type="text"
            placeholder="Producto / Libro prestado"
            value={producto}
            onChange={(e) => setProducto(e.target.value)}
            required
            className="bg-gray-900 border border-gray-700 text-white p-2.5 rounded-lg focus:outline-none focus:border-emerald-500"
          />
          <input
            type="number"
            placeholder="Monto / Depósito ($)"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            required
            className="bg-gray-900 border border-gray-700 text-white p-2.5 rounded-lg focus:outline-none focus:border-emerald-500"
          />
          <button
            type="submit"
            className="md:col-span-3 bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 rounded-lg font-medium transition-colors"
          >
            Registrar Órden
          </button>
        </form>
      </div>

      {/* Tabla de Órdenes */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        {loading ? (
          <p className="p-6 text-center text-gray-400">Cargando órdenes...</p>
        ) : error ? (
          <p className="p-6 text-center text-red-400">{error}</p>
        ) : (
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-gray-900 text-gray-400 uppercase text-xs">
              <tr>
                <th className="p-4">ID Órden</th>
                <th className="p-4">Usuario</th>
                <th className="p-4">Producto</th>
                <th className="p-4">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {orders.map((o: any) => (
                <tr key={o.id || o._id} className="hover:bg-gray-750">
                  <td className="p-4 font-mono text-xs text-gray-500">{o.id || o._id}</td>
                  <td className="p-4 font-medium text-white">{o.userId || o.usuario || 'N/A'}</td>
                  <td className="p-4">{o.product || o.producto || 'Préstamo Bibliográfico'}</td>
                  <td className="p-4 text-emerald-400 font-semibold">${o.total || o.monto || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};