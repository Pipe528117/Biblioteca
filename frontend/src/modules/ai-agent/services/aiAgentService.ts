import { api } from '../../../shared/config/api';

export const aiAgentService = {
  evaluateData: async (payload: any) => {
    const response = await api.post('/ai-agent/evaluate', payload);
    return response.data;
  }
};