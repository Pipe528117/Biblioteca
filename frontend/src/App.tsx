import { useState } from 'react';
import { ProductView } from './modules/products/components/ProductView';
import { CategoryView } from './modules/categories/components/CategoryView';
import { UserView } from './modules/users/components/UserView';
import { OrderView } from './modules/orders/components/OrderView';
import { AuthorView } from './modules/authors/components/AuthorView';
import { aiAgentService } from './modules/ai-agent/services/aiAgentService';

type Tab = 'dashboard' | 'products' | 'users' | 'orders' | 'categories' | 'authors' | 'ai-agent';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [agentResult, setAgentResult] = useState<any>(null);
  const [evaluating, setEvaluating] = useState(false);

  const handleTestAgent = async () => {
    setEvaluating(true);
    try {
      const res = await aiAgentService.evaluateData({ priority: 'high', userType: 'student' });
      setAgentResult(res);
    } catch (err) {
      console.error('Error al evaluar con Agente IA:', err);
    } finally {
      setEvaluating(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 font-sans">
      {/* Sidebar de navegación */}
      <aside className="w-64 bg-gray-800 border-r border-gray-700 p-5 flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-bold text-emerald-400 mb-6">BiblioAcceso ODS</h1>
          <nav className="space-y-2">
            {[
              { id: 'dashboard', label: '📊 Inicio' },
              { id: 'products', label: '📚 Productos' },
              { id: 'users', label: '👥 Usuarios' },
              { id: 'orders', label: '🛒 Órdenes' },
              { id: 'categories', label: '🏷️ Categorías' },
              { id: 'authors', label: '✍️ Autores' },
              { id: 'ai-agent', label: '🤖 Agente IA' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as Tab)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? 'bg-emerald-600 text-white'
                    : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="text-xs text-gray-500">
          Backend Hexagonal • Node.js + TS
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 overflow-y-auto p-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Panel Principal</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800 p-5 rounded-xl border border-gray-700">
                <h3 className="text-gray-400 text-sm">Módulos CRUD</h3>
                <p className="text-3xl font-bold text-emerald-400 mt-2">5</p>
              </div>
              <div className="bg-gray-800 p-5 rounded-xl border border-gray-700">
                <h3 className="text-gray-400 text-sm">Módulo Autónomo</h3>
                <p className="text-3xl font-bold text-indigo-400 mt-2">1 (Agente IA)</p>
              </div>
              <div className="bg-gray-800 p-5 rounded-xl border border-gray-700">
                <h3 className="text-gray-400 text-sm">Estado de API</h3>
                <p className="text-3xl font-bold text-emerald-500 mt-2">Conectado</p>
              </div>
            </div>
          </div>
        )}

        {/* Vistas reales conectadas */}
        {activeTab === 'products' && <ProductView />}
        {activeTab === 'users' && <UserView />}
        {activeTab === 'orders' && <OrderView />}
        {activeTab === 'categories' && <CategoryView />}
        {activeTab === 'authors' && <AuthorView />}

        {/* Vista del Agente IA */}
        {activeTab === 'ai-agent' && (
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 max-w-2xl">
            <h2 className="text-xl font-bold text-indigo-400 mb-2">Evaluador Agéntico con IA</h2>
            <p className="text-sm text-gray-400 mb-6">
              Envía solicitudes directamente al controlador del módulo autónomo de IA.
            </p>
            <button
              onClick={handleTestAgent}
              disabled={evaluating}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              {evaluating ? 'Evaluando prioridad...' : 'Probar Decisión del Agente'}
            </button>

            {agentResult && (
              <div className="mt-6 p-4 bg-gray-900 rounded-lg border border-indigo-500/30">
                <h4 className="text-xs uppercase text-indigo-400 font-semibold mb-2">Respuesta del Agente:</h4>
                <pre className="text-xs text-gray-300 font-mono overflow-x-auto">
                  {JSON.stringify(agentResult, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}