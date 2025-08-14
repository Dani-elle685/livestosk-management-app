import React, { Suspense } from 'react'
import { LivestockListPage } from './LivestockListHome'
import { listedAnimalsForSale } from '@/infrastructure/marketplace/services/listed.animals.service'

const page = () => {
  return (
    <Suspense fallback={<div>Loading Animals....</div>}>
      <div className='w-full'>
      <DataFetcher />
    </div>
    </Suspense>
    
  )
}

export default page


const DataFetcher = async ()=>{
  const listedAnimals = await listedAnimalsForSale();

  return(
    <LivestockListPage listedAnmals={listedAnimals} />
  )
}