import React from 'react'
import FileUpload from '../livestock/tables/file-upload'
import AddLivestockForm from '../livestock/forms/add-livestock-form'
import { LivestockDataTable } from '../livestock/tables/all-livestock-table'
import LivestockHome from '../livestock/livestock-home'

const page = () => {
  return (
    <div className='p-5'>
      {/* <FileUpload/> */}
      {/* <AddLivestockForm/> */}
      <LivestockHome/>
    </div>
  )
}

export default page
