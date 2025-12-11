import React from 'react';
import { CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';

export default function TransactionDetail({ transaction, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Détails de la Transaction</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">ID Transaction</p>
                <p className="font-semibold text-gray-900">{transaction.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Client</p>
                <p className="font-semibold text-gray-900">{transaction.client_id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Montant</p>
                <p className="font-semibold text-gray-900 text-lg">{transaction.montant.toFixed(2)}€</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date et Heure</p>
                <p className="font-semibold text-gray-900">{transaction.date} {transaction.heure}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Lieu</p>
                <p className="font-semibold text-gray-900">{transaction.lieu}, {transaction.pays}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Type</p>
                <p className="font-semibold text-gray-900">{transaction.type}</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Analyse de Fraude</h3>
              <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${
                transaction.status === 'normal' ? 'bg-green-100 text-green-800' :
                transaction.status === 'suspect' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {transaction.status === 'normal' && <CheckCircle className="w-5 h-5" />}
                {transaction.status === 'suspect' && <AlertTriangle className="w-5 h-5" />}
                {transaction.status === 'frauduleux' && <AlertCircle className="w-5 h-5" />}
                {transaction.status.toUpperCase()}
              </span>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Score de suspicion</span>
                <span className="text-2xl font-bold text-gray-900">{transaction.score}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all ${
                    transaction.score >= 51 ? 'bg-red-500' :
                    transaction.score >= 21 ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}
                  style={{ width: `${Math.min(transaction.score, 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0 - Normal</span>
                <span>21 - Suspect</span>
                <span>51+ - Frauduleux</span>
              </div>
            </div>
          </div>

          {transaction.rules && transaction.rules.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Règles Déclenchées (Logique)</h3>
              <div className="space-y-3">
                {transaction.rules.map((rule, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{rule.name}</h4>
                        <p className="text-sm text-gray-600">{rule.description}</p>
                      </div>
                      <span className="ml-4 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                        +{rule.points} pts
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}