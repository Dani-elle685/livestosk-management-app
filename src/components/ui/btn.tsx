import { cn } from '@/lib/utils';
import React from 'react'

interface Props{
    name:string;
    onClick:()=>void;
    className?:string;
}

const Btn = ({name, onClick, className}:Props) => {
  return (
    <div>
      <button onClick={onClick} className={cn(className!)}>{name}</button>
    </div>
  )
}

export default Btn
