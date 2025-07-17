import React from 'react'
import FileUpload from '../tables/file-upload'
import { Label } from '@/components/ui/label'

const AddBulkLivestock = () => {
  return (
    <div className='flex flex-col gap-5 py-4 w-full'>
     <Label className='text-base font-semibold'>SELECT A FILE WITH THE BULK DATA FOR UPLOAD</Label>
      <FileUpload/> 
    </div>
  )
}

export default AddBulkLivestock
