const fs = require('fs').promises;
const path = require('path');

class DataService {
  constructor() {
    this.DATA_DIR = path.join(__dirname, '..', 'data');
    this.TRANSACTIONS_FILE = path.join(this.DATA_DIR, 'transactions.json');
    this.CLIENTS_FILE = path.join(this.DATA_DIR, 'clients.json');
  }

  async initializeData() {
    try {
      await fs.mkdir(this.DATA_DIR, { recursive: true });

      const initialTransactions = [
        {
          id: "TXN001",
          client_id: "C001",
          montant: 45.50,
          date: "2025-12-10",
          heure: "10:30",
          lieu: "Paris",
          pays: "France",
          type: "Achat en magasin",
          marchand: "Carrefour",
          status: "normal",
          score: 0,
          rules: []
        },
        {
          id: "TXN002",
          client_id: "C001",
          montant: 2500.00,
          date: "2025-12-10",
          heure: "14:45",
          lieu: "Tokyo",
          pays: "Japon",
          type: "Achat en ligne",
          marchand: "Electronics Store",
          status: "frauduleux",
          score: 75,
          rules: [
            { name: "Montant élevé", description: "2500€ > 360€", points: 30 },
            { name: "Pays inhabituel", description: "Japon vs France", points: 20 }
          ]
        },
        {
          id: "TXN003",
          client_id: "C002",
          montant: 150.00,
          date: "2025-12-10",
          heure: "09:15",
          lieu: "Lyon",
          pays: "France",
          type: "Restaurant",
          marchand: "Le Bistrot",
          status: "normal",
          score: 0,
          rules: []
        }
      ];

      const initialClients = [
        {
          client_id: "C001",
          nom: "Jean Dupont",
          email: "jean.dupont@email.com",
          montant_moyen: 120.00,
          montant_max_habituel: 500.00,
          frequence_moyenne: 10,
          lieux_habituels: ["Paris", "Lyon"],
          pays_habituel: "France",
          historique_fraudes: []
        },
        {
          client_id: "C002",
          nom: "Marie Martin",
          email: "marie.martin@email.com",
          montant_moyen: 85.00,
          montant_max_habituel: 300.00,
          frequence_moyenne: 15,
          lieux_habituels: ["Lyon", "Grenoble"],
          pays_habituel: "France",
          historique_fraudes: []
        },
        {
          client_id: "C003",
          nom: "Pierre Dubois",
          email: "pierre.dubois@email.com",
          montant_moyen: 200.00,
          montant_max_habituel: 600.00,
          frequence_moyenne: 8,
          lieux_habituels: ["Marseille"],
          pays_habituel: "France",
          historique_fraudes: []
        }
      ];

      try {
        await fs.access(this.TRANSACTIONS_FILE);
      } catch {
        await fs.writeFile(this.TRANSACTIONS_FILE, JSON.stringify(initialTransactions, null, 2));
      }

      try {
        await fs.access(this.CLIENTS_FILE);
      } catch {
        await fs.writeFile(this.CLIENTS_FILE, JSON.stringify(initialClients, null, 2));
      }

      console.log('✅ Données initialisées');
    } catch (error) {
      console.error('❌ Erreur initialisation:', error);
      throw error;
    }
  }

  async readTransactions() {
    try {
      const data = await fs.readFile(this.TRANSACTIONS_FILE, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Erreur lecture transactions:', error);
      throw error;
    }
  }

  async readClients() {
    try {
      const data = await fs.readFile(this.CLIENTS_FILE, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Erreur lecture clients:', error);
      throw error;
    }
  }

  async writeTransactions(transactions) {
    try {
      await fs.writeFile(this.TRANSACTIONS_FILE, JSON.stringify(transactions, null, 2));
    } catch (error) {
      console.error('Erreur écriture transactions:', error);
      throw error;
    }
  }

  async writeClients(clients) {
    try {
      await fs.writeFile(this.CLIENTS_FILE, JSON.stringify(clients, null, 2));
    } catch (error) {
      console.error('Erreur écriture clients:', error);
      throw error;
    }
  }

  async getTransactionById(id) {
    const transactions = await this.readTransactions();
    return transactions.find(t => t.id === id);
  }

  async getClientById(clientId) {
    const clients = await this.readClients();
    return clients.find(c => c.client_id === clientId);
  }
}

module.exports = new DataService();