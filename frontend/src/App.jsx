import React, { useState, useEffect } from 'react';
import { Shield, Plus } from 'lucide-react';
import { api } from './services/api';
import Statistics from './components/Statistics';
import Charts from './components/Charts';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import TransactionDetail from './components/TransactionDetail';
import ClientDetail from './components/ClientDetail';
import ExportMenu from './components/ExportMenu';

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [clients, setClients] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [advancedFilters, setAdvancedFilters] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
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
    // Filtre par statut
    if (filter !== 'all' && t.status !== filter) return false;

    // Recherche textuelle
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const matchesSearch = 
        t.id.toLowerCase().includes(term) ||
        t.client_id.toLowerCase().includes(term) ||
        t.lieu.toLowerCase().includes(term) ||
        t.pays.toLowerCase().includes(term) ||
        t.marchand.toLowerCase().includes(term) ||
        t.type.toLowerCase().includes(term);
      
      if (!matchesSearch) return false;
    }

    // Filtres avancés
    if (advancedFilters.dateFrom && t.date < advancedFilters.dateFrom) return false;
    if (advancedFilters.dateTo && t.date > advancedFilters.dateTo) return false;
    if (advancedFilters.montantMin && t.montant < parseFloat(advancedFilters.montantMin)) return false;
    if (advancedFilters.montantMax && t.montant > parseFloat(advancedFilters.montantMax)) return false;
    if (advancedFilters.scoreMin && t.score < parseInt(advancedFilters.scoreMin)) return false;
    if (advancedFilters.scoreMax && t.score > parseInt(advancedFilters.scoreMax)) return false;
    if (advancedFilters.lieu && !t.lieu.toLowerCase().includes(advancedFilters.lieu.toLowerCase())) return false;
    if (advancedFilters.pays && !t.pays.toLowerCase().includes(advancedFilters.pays.toLowerCase())) return false;
    if (advancedFilters.type && t.type !== advancedFilters.type) return false;

    return true;
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
            <div className="flex items-center gap-3">
                <ExportMenu 
                  transactions={transactions}
                  clients={clients}
                  statistics={statistics}
                />
      <button
        onClick={() => setShowForm(!showForm)}
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        <Plus className="w-5 h-5" />
        Nouvelle Transaction
      </button>
    </div>
              </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Statistics statistics={statistics} />
        <Charts transactions={transactions} />
        
        {/* Barre de recherche */}
        <SearchBar 
          onSearch={setSearchTerm}
          onFilterChange={setAdvancedFilters}
        />
        
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
          onSelectClient={setSelectedClient}
          clients={clients}
        />
      </div>

      {selectedTransaction && (
        <TransactionDetail
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}

      {selectedClient && (
        <ClientDetail
          client={selectedClient}
          transactions={transactions}
          onClose={() => setSelectedClient(null)}
        />
      )}
    </div>
  );
}