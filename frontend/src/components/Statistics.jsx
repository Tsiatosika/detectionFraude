import React from 'react';
import { TrendingUp, CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';

export default function Statistics({ statistics }) {
  if (!statistics) return null;

  const statCards = [
    {
      title: "Total Transactions",
      value: statistics.total,
      icon: <TrendingUp />,
      color: "blue"
    },
    {
      title: "Transactions Normales",
      value: statistics.normal,
      icon: <CheckCircle />,
      color: "green"
    },
    {
      title: "Transactions Suspectes",
      value: statistics.suspect,
      icon: <AlertTriangle />,
      color: "yellow"
    },
    {
      title: "Fraudes Détectées",
      value: statistics.frauduleux,
      icon: <AlertCircle />,
      color: "red"
    }
  ];

  const colors = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    red: 'bg-red-100 text-red-600'
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {statCards.map((stat, idx) => (
        <div key={idx} className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-lg ${colors[stat.color]}`}>
              {React.cloneElement(stat.icon, { className: 'w-6 h-6' })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}