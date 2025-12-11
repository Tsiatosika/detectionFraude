import React from 'react';
import { CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';

export default function TransactionList({ transactions, onSelectTransaction, onSelectClient, clients }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'normal': return 'bg-green-100 text-green-800';
      case 'suspect': return 'bg-yellow-100 text-yellow-800';
      case 'frauduleux': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'normal': return <CheckCircle className="w-5 h-5" />;
      case 'suspect': return <AlertTriangle className="w-5 h-5" />;
      case 'frauduleux': return <AlertCircle className="w-5 h-5" />;
      default: return null;
    }
  };

  const handleClientClick = (clientId) => {
    const client = clients.find(c => c.client_id === clientId);
    if (client && onSelectClient) {
      onSelectClient(client);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Montant</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lieu</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date/Heure</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {transactions.map(txn => (
              <tr key={txn.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{txn.id}</td>
                <td className="px-6 py-4 text-sm">
                  <button
                    onClick={() => handleClientClick(txn.client_id)}
                    className="text-blue-600 hover:text-blue-800 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded px-1"
                    title="Voir les détails du client"
                  >
                    {txn.client_id}
                  </button>
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">{txn.montant.toFixed(2)}€</td>
                <td className="px-6 py-4 text-sm text-gray-600">{txn.lieu}, {txn.pays}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{txn.date} {txn.heure}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    txn.score >= 51 ? 'bg-red-100 text-red-800' :
                    txn.score >= 21 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {txn.score}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(txn.status)}`}>
                    {getStatusIcon(txn.status)}
                    {txn.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onSelectTransaction(txn)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                  >
                    Détails
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}