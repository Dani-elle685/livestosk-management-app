import React from 'react'
interface Props{
    filterType:string;
    setFilterType:(value:string)=>void;
    summary: Record<string, number>;
}

const LivestockHeader:React.FC<Props> = ({filterType,setFilterType,summary}) => {
  return (
    <div>
      <div className="flex flex-wrap gap-4 sm:flex-row items-center border-b pb-4 bg-white w-full p-1 md:p-4">
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
              <div className='capitalize'>{type}</div>
              <div className="text-xl font-bold">{count}</div>
            </button>
          );
        })}
      </div>
    </div>
  )
}

export default LivestockHeader
