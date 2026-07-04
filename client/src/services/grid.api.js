import api from './api';

export const fetchGrid = async () => {
  const response = await api.get('/api/grid');
  return response.data;
};

export const claimGridBlock = async (id, ownerName, ownerColor) => {
  const response = await api.post(`/api/grid/claim/${id}`, { ownerName, ownerColor });
  return response.data;
};
