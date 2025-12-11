class Transaction {
  constructor(data) {
    this.id = data.id;
    this.client_id = data.client_id;
    this.montant = data.montant;
    this.date = data.date;
    this.heure = data.heure;
    this.lieu = data.lieu;
    this.pays = data.pays;
    this.type = data.type;
    this.marchand = data.marchand;
    this.status = data.status || 'normal';
    this.score = data.score || 0;
    this.rules = data.rules || [];
  }

  toJSON() {
    return {
      id: this.id,
      client_id: this.client_id,
      montant: this.montant,
      date: this.date,
      heure: this.heure,
      lieu: this.lieu,
      pays: this.pays,
      type: this.type,
      marchand: this.marchand,
      status: this.status,
      score: this.score,
      rules: this.rules
    };
  }
}

module.exports = Transaction;