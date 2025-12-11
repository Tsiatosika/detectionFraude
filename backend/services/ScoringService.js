const RuleEngine = require('./RuleEngine');

class ScoringService {
  constructor() {
    this.thresholds = {
      normal: { min: 0, max: 20 },
      suspect: { min: 21, max: 50 },
      frauduleux: { min: 51, max: Infinity }
    };
  }

  analyzeTransaction(transaction, client) {
    const analysis = RuleEngine.analyzeTransaction(transaction, client);
    const status = this.determineStatus(analysis.score);

    return {
      score: analysis.score,
      status: status,
      rules: analysis.rules
    };
  }

  determineStatus(score) {
    if (score >= this.thresholds.frauduleux.min) {
      return 'frauduleux';
    } else if (score >= this.thresholds.suspect.min) {
      return 'suspect';
    } else {
      return 'normal';
    }
  }

  getStatusDescription(status) {
    const descriptions = {
      normal: 'Transaction normale - Aucune anomalie détectée',
      suspect: 'Transaction suspecte - Surveillance recommandée',
      frauduleux: 'Fraude probable - Blocage recommandé'
    };
    return descriptions[status] || 'Statut inconnu';
  }

  calculateStatistics(transactions) {
    const stats = {
      total: transactions.length,
      normal: 0,
      suspect: 0,
      frauduleux: 0,
      scoreTotal: 0,
      scoreMoyen: 0
    };

    transactions.forEach(t => {
      stats[t.status]++;
      stats.scoreTotal += t.score;
    });

    stats.scoreMoyen = stats.total > 0 ? (stats.scoreTotal / stats.total).toFixed(2) : 0;

    return stats;
  }
}

module.exports = new ScoringService();