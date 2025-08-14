import React, { Suspense } from 'react'
import CartHomePage from './CartHomePage'

const page = () => {
  return (
    <Suspense>
      <div className='bg-[#faf7f7]'>
          <CartHomePage/>
      </div>
    </Suspense>
  )
}

export default page
