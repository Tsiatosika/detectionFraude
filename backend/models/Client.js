class Client {
  constructor(data) {
    this.client_id = data.client_id;
    this.nom = data.nom;
    this.email = data.email;
    this.montant_moyen = data.montant_moyen;
    this.montant_max_habituel = data.montant_max_habituel;
    this.frequence_moyenne = data.frequence_moyenne;
    this.lieux_habituels = data.lieux_habituels || [];
    this.pays_habituel = data.pays_habituel;
    this.historique_fraudes = data.historique_fraudes || [];
  }

  toJSON() {
    return {
      client_id: this.client_id,
      nom: this.nom,
      email: this.email,
      montant_moyen: this.montant_moyen,
      montant_max_habituel: this.montant_max_habituel,
      frequence_moyenne: this.frequence_moyenne,
      lieux_habituels: this.lieux_habituels,
      pays_habituel: this.pays_habituel,
      historique_fraudes: this.historique_fraudes
    };
  }
}

module.exports = Client;