import api from './api';

export const fetchGrid = async () => {
  const response = await api.get('/api/grid');
  return response.data;
};
