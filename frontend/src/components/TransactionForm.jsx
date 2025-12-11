import React, { useState } from 'react';
import { X } from 'lucide-react';

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
    if (!formData.montant || !formData.lieu || !formData.marchand) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    onSubmit({
      ...formData,
      montant: parseFloat(formData.montant)
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header du modal */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Nouvelle Transaction</h2>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-600 transition p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Formulaire */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Client */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Client <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.client_id}
                onChange={(e) => setFormData({ ...formData, client_id: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              >
                {clients.map(c => (
                  <option key={c.client_id} value={c.client_id}>
                    {c.nom} ({c.client_id})
                  </option>
                ))}
              </select>
            </div>

            {/* Montant */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Montant (€) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.montant}
                onChange={(e) => setFormData({ ...formData, montant: e.target.value })}
                placeholder="Ex: 150.00"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            {/* Lieu */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lieu <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.lieu}
                onChange={(e) => setFormData({ ...formData, lieu: e.target.value })}
                placeholder="Ex: Paris"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            {/* Pays */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pays <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.pays}
                onChange={(e) => setFormData({ ...formData, pays: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              >
                <option value="France">France</option>
                <option value="Belgique">Belgique</option>
                <option value="Suisse">Suisse</option>
                <option value="Allemagne">Allemagne</option>
                <option value="Espagne">Espagne</option>
                <option value="Italie">Italie</option>
                <option value="Royaume-Uni">Royaume-Uni</option>
                <option value="États-Unis">États-Unis</option>
                <option value="Canada">Canada</option>
                <option value="Japon">Japon</option>
                <option value="Chine">Chine</option>
                <option value="Autre">Autre</option>
              </select>
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type de transaction
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              >
                <option>Achat en ligne</option>
                <option>Achat en magasin</option>
                <option>Restaurant</option>
                <option>Carburant</option>
                <option>Retrait ATM</option>
                <option>Hôtel</option>
                <option>Transport</option>
                <option>Divertissement</option>
                <option>Santé</option>
                <option>Autre</option>
              </select>
            </div>

            {/* Marchand */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Marchand <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.marchand}
                onChange={(e) => setFormData({ ...formData, marchand: e.target.value })}
                placeholder="Ex: Amazon, Carrefour..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Aperçu du client sélectionné */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm font-medium text-blue-900 mb-2">📋 Profil du client sélectionné :</p>
            {clients.find(c => c.client_id === formData.client_id) && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div>
                  <p className="text-blue-600">Montant moyen</p>
                  <p className="font-semibold text-blue-900">
                    {clients.find(c => c.client_id === formData.client_id).montant_moyen.toFixed(2)}€
                  </p>
                </div>
                <div>
                  <p className="text-blue-600">Limite habituelle</p>
                  <p className="font-semibold text-blue-900">
                    {clients.find(c => c.client_id === formData.client_id).montant_max_habituel.toFixed(2)}€
                  </p>
                </div>
                <div>
                  <p className="text-blue-600">Lieux habituels</p>
                  <p className="font-semibold text-blue-900">
                    {clients.find(c => c.client_id === formData.client_id).lieux_habituels.join(', ')}
                  </p>
                </div>
                <div>
                  <p className="text-blue-600">Pays habituel</p>
                  <p className="font-semibold text-blue-900">
                    {clients.find(c => c.client_id === formData.client_id).pays_habituel}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Boutons d'action */}
          <div className="flex gap-3 justify-end mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={onCancel}
              className="px-6 py-3 border-2 border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition"
            >
              Annuler
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
            >
              Analyser la Transaction
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}