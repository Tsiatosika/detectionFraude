const express = require('express');
const cors = require('cors');
const DataService = require('./services/DataService');
const ScoringService = require('./services/ScoringService');
const Transaction = require('./models/Transaction');
const Client = require('./models/Client');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// GET - Toutes les transactions
app.get('/api/transactions', async (req, res) => {
  try {
    const transactions = await DataService.readTransactions();
    res.json(transactions);
  } catch (error) {
    console.error('Erreur GET transactions:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET - Transaction par ID
app.get('/api/transactions/:id', async (req, res) => {
  try {
    const transaction = await DataService.getTransactionById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction non trouvée' });
    }
    res.json(transaction);
  } catch (error) {
    console.error('Erreur GET transaction:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET - Tous les clients
app.get('/api/clients', async (req, res) => {
  try {
    const clients = await DataService.readClients();
    res.json(clients);
  } catch (error) {
    console.error('Erreur GET clients:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET - Client par ID
app.get('/api/clients/:id', async (req, res) => {
  try {
    const client = await DataService.getClientById(req.params.id);
    if (!client) {
      return res.status(404).json({ error: 'Client non trouvé' });
    }
    res.json(client);
  } catch (error) {
    console.error('Erreur GET client:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST - Créer une nouvelle transaction
app.post('/api/transactions', async (req, res) => {
  try {
    const transactions = await DataService.readTransactions();
    const clients = await DataService.readClients();

    // Créer la nouvelle transaction
    const transactionData = {
      id: `TXN${String(transactions.length + 1).padStart(3, '0')}`,
      ...req.body,
      date: req.body.date || new Date().toISOString().split('T')[0],
      heure: req.body.heure || new Date().toLocaleTimeString('fr-FR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };

    // Trouver le client
    const client = clients.find(c => c.client_id === transactionData.client_id);
    if (!client) {
      return res.status(404).json({ error: 'Client non trouvé' });
    }

    // Analyser la transaction
    const analysis = ScoringService.analyzeTransaction(transactionData, client);

    // Créer l'objet Transaction complet
    const newTransaction = new Transaction({
      ...transactionData,
      score: analysis.score,
      status: analysis.status,
      rules: analysis.rules
    });

    // Sauvegarder
    transactions.push(newTransaction.toJSON());
    await DataService.writeTransactions(transactions);

    res.status(201).json(newTransaction.toJSON());
  } catch (error) {
    console.error('Erreur POST transaction:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET - Statistiques
app.get('/api/statistics', async (req, res) => {
  try {
    const transactions = await DataService.readTransactions();
    const stats = ScoringService.calculateStatistics(transactions);
    res.json(stats);
  } catch (error) {
    console.error('Erreur GET statistics:', error);
    res.status(500).json({ error: error.message });
  }
});

// Initialiser et démarrer le serveur
DataService.initializeData().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
    console.log(`📊 API disponible sur http://localhost:${PORT}/api`);
    console.log(`\n📁 Structure modulaire:`);
    console.log(`   ├── models/ (Transaction, Client)`);
    console.log(`   ├── services/ (DataService, RuleEngine, ScoringService)`);
    console.log(`   └── server.js (API Routes)`);
  });
}).catch(error => {
  console.error('❌ Erreur démarrage serveur:', error);
  process.exit(1);
});