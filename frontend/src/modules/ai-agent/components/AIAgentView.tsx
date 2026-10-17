import React, { useState } from 'react';
import { api } from '../../../shared/config/api';

export const AIAgentView: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleConsult = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    try {
      // Ajusta la ruta '/ai-agent' según el endpoint que haya definido tu compañero en el backend
      const res = await api.post('/ai-agent', { prompt });
      setResponse(res.data.response || res.data.resultado || JSON.stringify(res.data));
    } catch (err: any) {
      setResponse(err.response?.data?.message || 'Error al comunicarse con el agente inteligente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Asistente IA Agéntica ODS</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <p className="text-gray-600 mb-4">
          Realiza consultas o solicita análisis automatizados al sistema inteligente de BiblioAcceso.
        </p>

        <form onSubmit={handleConsult} className="space-y-4">
          <textarea
            rows={3}
            placeholder="Ej: ¿Qué libros están vinculados al ODS de Educación de Calidad?"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
            className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition duration-200 disabled:opacity-50"
          >
            {loading ? 'Analizando...' : 'Consultar Agente'}
          </button>
        </form>
      </div>

      {response && (
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-600">
          <h3 className="font-semibold text-gray-700 mb-2">Respuesta del Agente:</h3>
          <p className="text-gray-800 whitespace-pre-wrap bg-gray-50 p-4 rounded">{response}</p>
        </div>
      )}
    </div>
  );
};