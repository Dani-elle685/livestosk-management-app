import React, { Suspense } from 'react'
import LivestockHome from './livestock-home'
import { fetchAllLivestockService } from '@/infrastructure/livestosks/services/fetch.all.livestocks.service'



const LivestockPage = async () => {
  return (
    <Suspense fallback={<div>Loading ... </div>}>
      <FetchData/>
    </Suspense>
  )
}
export default LivestockPage


const FetchData = async () =>{
  const data = await fetchAllLivestockService();
  return (
    <div>
        <LivestockHome allAnimals={data}/>
    </div>
  )
}