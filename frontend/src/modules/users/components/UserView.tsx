import React, { useEffect, useState } from 'react';
import { userService, User } from '../services/userService';

export const UserView: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [rol, setRol] = useState('student');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getAll();
      setUsers(data);
    } catch (err: any) {
      setError('Error al cargar la lista de usuarios.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await userService.create({ name: nombre, email, role: rol });
      setNombre('');
      setEmail('');
      fetchUsers();
    } catch (err) {
      alert('Error al registrar usuario.');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Gestión de Usuarios</h2>

      {/* Formulario */}
      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-emerald-400">Registrar Nuevo Usuario</h3>
        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Nombre completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="bg-gray-900 border border-gray-700 text-white p-2.5 rounded-lg focus:outline-none focus:border-emerald-500"
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-gray-900 border border-gray-700 text-white p-2.5 rounded-lg focus:outline-none focus:border-emerald-500"
          />
          <select
            value={rol}
            onChange={(e) => setRol(e.target.value)}
            className="bg-gray-900 border border-gray-700 text-white p-2.5 rounded-lg focus:outline-none focus:border-emerald-500"
          >
            <option value="student">Estudiante</option>
            <option value="admin">Administrador</option>
            <option value="teacher">Docente</option>
          </select>
          <button
            type="submit"
            className="md:col-span-3 bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 rounded-lg font-medium transition-colors"
          >
            Guardar Usuario
          </button>
        </form>
      </div>

      {/* Tabla de usuarios */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        {loading ? (
          <p className="p-6 text-center text-gray-400">Cargando usuarios...</p>
        ) : error ? (
          <p className="p-6 text-center text-red-400">{error}</p>
        ) : (
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-gray-900 text-gray-400 uppercase text-xs">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Nombre</th>
                <th className="p-4">Correo</th>
                <th className="p-4">Rol</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {users.map((u: any) => (
                <tr key={u.id || u._id} className="hover:bg-gray-750">
                  <td className="p-4 font-mono text-xs text-gray-500">{u.id || u._id}</td>
                  <td className="p-4 font-medium text-white">{u.name || u.nombre}</td>
                  <td className="p-4">{u.email}</td>
                  <td className="p-4">
                    <span className="bg-emerald-900/50 text-emerald-400 px-2.5 py-1 rounded-full text-xs">
                      {u.role || u.rol || 'student'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};