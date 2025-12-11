import React, { useState } from 'react';

export default function TransactionForm({ clients, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    client_id: clients[0]?.client_id || '',
    montant: '',
    lieu: '',
    pays: 'France',
    type: 'Achat en ligne',
    marchand: ''
  });

  const handleSubmit = () => {
    onSubmit({
      ...formData,
      montant: parseFloat(formData.montant)
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Nouvelle Transaction</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
          <select
            value={formData.client_id}
            onChange={(e) => setFormData({ ...formData, client_id: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {clients.map(c => (
              <option key={c.client_id} value={c.client_id}>
                {c.nom} ({c.client_id})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Montant (€)</label>
          <input
            type="number"
            step="0.01"
            value={formData.montant}
            onChange={(e) => setFormData({ ...formData, montant: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Lieu</label>
          <input
            type="text"
            value={formData.lieu}
            onChange={(e) => setFormData({ ...formData, lieu: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Pays</label>
          <input
            type="text"
            value={formData.pays}
            onChange={(e) => setFormData({ ...formData, pays: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option>Achat en ligne</option>
            <option>Achat en magasin</option>
            <option>Restaurant</option>
            <option>Carburant</option>
            <option>Retrait ATM</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Marchand</label>
          <input
            type="text"
            value={formData.marchand}
            onChange={(e) => setFormData({ ...formData, marchand: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="md:col-span-2 flex gap-3 justify-end mt-4">
          <button
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Analyser la Transaction
          </button>
        </div>
      </div>
    </div>
  );
}