class RuleEngine {
  constructor() {
    this.rules = [
      {
        name: 'montantEleve',
        check: (transaction, client) => transaction.montant > client.montant_moyen * 3,
        points: 30,
        getMessage: (transaction, client) => ({
          name: "Montant élevé",
          description: `${transaction.montant}€ > ${(client.montant_moyen * 3).toFixed(2)}€ (3x moyenne)`,
          points: 30
        })
      },
      {
        name: 'paysInhabituel',
        check: (transaction, client) => transaction.pays !== client.pays_habituel,
        points: 20,
        getMessage: (transaction, client) => ({
          name: "Pays inhabituel",
          description: `Transaction au ${transaction.pays} (habituel: ${client.pays_habituel})`,
          points: 20
        })
      },
      {
        name: 'lieuInhabituel',
        check: (transaction, client) => !client.lieux_habituels.includes(transaction.lieu),
        points: 15,
        getMessage: (transaction, client) => ({
          name: "Lieu inhabituel",
          description: `Transaction à ${transaction.lieu} (lieux habituels: ${client.lieux_habituels.join(', ')})`,
          points: 15
        })
      },
      {
        name: 'heureNocturne',
        check: (transaction) => {
          const heure = parseInt(transaction.heure.split(':')[0]);
          return heure >= 0 && heure < 6;
        },
        points: 15,
        getMessage: (transaction) => ({
          name: "Heure suspecte",
          description: `Transaction à ${transaction.heure} (horaire nocturne)`,
          points: 15
        })
      },
      {
        name: 'depassementLimite',
        check: (transaction, client) => transaction.montant > client.montant_max_habituel,
        points: 25,
        getMessage: (transaction, client) => ({
          name: "Dépassement limite",
          description: `${transaction.montant}€ dépasse la limite habituelle de ${client.montant_max_habituel}€`,
          points: 25
        })
      }
    ];
  }

  analyzeTransaction(transaction, client) {
    let score = 0;
    const triggeredRules = [];

    for (const rule of this.rules) {
      if (rule.check(transaction, client)) {
        score += rule.points;
        triggeredRules.push(rule.getMessage(transaction, client));
      }
    }

    return {
      score,
      rules: triggeredRules
    };
  }
}

module.exports = new RuleEngine();