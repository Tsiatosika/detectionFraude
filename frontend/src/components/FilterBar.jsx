import React from 'react';
import { Filter } from 'lucide-react';

export default function FilterBar({ filter, setFilter, count }) {
  const filters = ['all', 'normal', 'suspect', 'frauduleux'];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex items-center gap-4">
        <Filter className="w-5 h-5 text-gray-400" />
        <div className="flex gap-2">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg transition ${
                filter === f
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {f === 'all' ? 'Toutes' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <span className="ml-auto text-sm text-gray-500">
          {count} transaction(s)
        </span>
      </div>
    </div>
  );
}