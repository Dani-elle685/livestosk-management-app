'use client';

import React, { useState, useMemo } from 'react';
import { LivestockDataTable } from './tables/all-livestock-table';
import { Livestock } from '@/infrastructure/livestosks/dto/livestock-dto';

interface Props{
  allAnimals:Livestock[]
}

const LivestockHome:React.FC<Props> = ({allAnimals = []}) => {
  const [filterType, setFilterType] = useState<string>('All');

  const filteredData = useMemo(() => {
    return filterType === 'All' ? allAnimals : allAnimals.filter(animal => animal.type === filterType);
  }, [filterType]);

  const summary = useMemo(() => {
    const typeCounts: Record<string, number> = {};

    allAnimals.forEach(animal => {
      typeCounts[animal.type] = (typeCounts[animal.type] || 0) + 1;
    });

    return {
      total: allAnimals.length,
      ...typeCounts,
    };
  }, []);

  return (
    <div className="space-y-4 w-full py-6">
      {/* Summary Filter Bar */}
      <div className="flex flex-wrap gap-4 sm:flex-row items-center border-b pb-4">
        <button
          onClick={() => setFilterType('All')}
          className={`px-4 py-2 border rounded ${filterType === 'All' ? 'bg-pink-100 border-pink-300' : 'border-gray-300'}`}
        >
          <div>Total Animals</div>
          <div className="text-xl font-bold">{summary.total}</div>
        </button>
        {Object.entries(summary).map(([type, count]) => {
          if (type === 'total') return null;
          return (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 border rounded ${filterType === type ? 'bg-pink-100 border-pink-300' : 'border-gray-300'}`}
            >
              <div>{type}</div>
              <div className="text-xl font-bold">{count}</div>
            </button>
          );
        })}
      </div>

      {/* Filtered Table */}
      <LivestockDataTable data={filteredData} />
    </div>
  );
};

export default LivestockHome;
