import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import React from 'react'

type Props ={
    isValid?: Boolean,
    isSubmitting: Boolean,
    classname?: string,
    title?: string,
    submittingTitle?: string,
    onSubmit?:()=> void
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined 
}

const SubmitButton = ({isValid =true, isSubmitting,classname,title ='Submit',submittingTitle="Submitting...",onSubmit, variant}:Props) => {
  return (
    <Button 
        type="submit"
        className={cn("w-full ", classname)}
        disabled={!isValid}
        onClick={onSubmit}
        variant={variant}
    >
        {isSubmitting ? (
            <>
                <Loader2 size={20} className="mr-2 animate-spin"/>
                {submittingTitle}
            </>
        ) : title}
    </Button>
  )
}

export default SubmitButton