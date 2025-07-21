'use client';

import React, { useState, useMemo } from 'react';
import { LivestockDataTable } from './tables/all-livestock-table';
import { Livestock } from '@/infrastructure/livestosks/dto/livestock-dto';
import LivestockHeader from './livestock.header';

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
      
      <LivestockHeader filterType={filterType} setFilterType={setFilterType} summary={summary}/>
      {/* Filtered Table */}
      <div className='bg-white w-full p-1 md:p-4'>
              <LivestockDataTable data={filteredData} />

      </div>
    </div>
  );
};

export default LivestockHome;
