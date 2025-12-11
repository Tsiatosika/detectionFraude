import React, { useState, useEffect } from 'react';
import { Shield, Plus } from 'lucide-react';
import { api } from './services/api';
import Statistics from './components/Statistics';
import FilterBar from './components/FilterBar';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import TransactionDetail from './components/TransactionDetail';

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [clients, setClients] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [filter, setFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [txns, clnts, stats] = await Promise.all([
        api.getTransactions(),
        api.getClients(),
        api.getStatistics()
      ]);
      setTransactions(txns);
      setClients(clnts);
      setStatistics(stats);
    } catch (error) {
      console.error('Erreur de chargement:', error);
    }
    setLoading(false);
  };

  const handleCreateTransaction = async (data) => {
    try {
      await api.createTransaction(data);
      await loadData();
      setShowForm(false);
    } catch (error) {
      console.error('Erreur de création:', error);
    }
  };

  const filteredTransactions = transactions.filter(t => {
    if (filter === 'all') return true;
    return t.status === filter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Chargement du système de détection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Système de Détection de Fraudes</h1>
                <p className="text-sm text-gray-500">Analyse en temps réel avec logique et théorie des ensembles</p>
              </div>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <Plus className="w-5 h-5" />
              Nouvelle Transaction
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Statistics statistics={statistics} />
        
        {showForm && (
          <TransactionForm
            clients={clients}
            onSubmit={handleCreateTransaction}
            onCancel={() => setShowForm(false)}
          />
        )}

        <FilterBar 
          filter={filter} 
          setFilter={setFilter} 
          count={filteredTransactions.length} 
        />

        <TransactionList 
          transactions={filteredTransactions}
          onSelectTransaction={setSelectedTransaction}
        />
      </div>

      {selectedTransaction && (
        <TransactionDetail
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}
    </div>
  );
}