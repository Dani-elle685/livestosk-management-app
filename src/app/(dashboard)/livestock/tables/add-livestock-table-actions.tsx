import React from 'react';
import { CircleX, EyeIcon, Pencil } from 'lucide-react';
import Link from 'next/link';
import AddLivestockForm from '../forms/add-livestock-form';
import { LivestockDialog } from '../forms/LivestockDialog';
import { Livestock } from '@/infrastructure/livestosks/dto/livestock-dto';
import { ConfirmTable } from '@/components/reusable-components/deleteTableComponent';
import DeleteLivestock from '../forms/delete-livestock';

interface Props{
    livestock:Livestock
}

const AddLivestockTableActions:React.FC<Props> = ({livestock}) => {
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  return (
    <div className='flex items-center gap-2 justify-end'>
      <Link href={`/livestock/${livestock?.recordId}`}><EyeIcon className='text-gray-600' height={16} width={16}/> </Link>
      <LivestockDialog
        trigger={<Pencil className='text-blue-600 cursor-pointer' height={16} width={16}/>}
        open={openEdit}
        onOpenChange={setOpenEdit}
        className='md:max-w-2xl'
      >
        <AddLivestockForm onSuccess={() => setOpenEdit(false)} livestockInfo={livestock!}/>
      </LivestockDialog>

      <LivestockDialog
        trigger={  <CircleX className='text-red-600 cursor-pointer' height={16} width={16}/>}
        open={openDelete}
        onOpenChange={setOpenDelete}
        className="rounded"
      >
        <DeleteLivestock livestock={livestock!} onSuccess={()=> setOpenDelete(false)}/>
      </LivestockDialog>
    

    </div>
  )
}

export default AddLivestockTableActions
