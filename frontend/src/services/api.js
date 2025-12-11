const API_URL = 'http://localhost:3001/api';

export const api = {
  async getTransactions() {
    const res = await fetch(`${API_URL}/transactions`);
    if (!res.ok) throw new Error('Erreur lors de la récupération des transactions');
    return res.json();
  },

  async getClients() {
    const res = await fetch(`${API_URL}/clients`);
    if (!res.ok) throw new Error('Erreur lors de la récupération des clients');
    return res.json();
  },

  async createTransaction(data) {
    const res = await fetch(`${API_URL}/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Erreur lors de la création de la transaction');
    return res.json();
  },

  async getStatistics() {
    const res = await fetch(`${API_URL}/statistics`);
    if (!res.ok) throw new Error('Erreur lors de la récupération des statistiques');
    return res.json();
  }
};
