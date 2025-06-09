import React from 'react'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Control, FieldPath, FieldValues } from 'react-hook-form'

type InputProps<T extends FieldValues> = {
    label: string
    description: string
    name: FieldPath<T>
    control: Control<T>
    placeholder: string
    /**
   * An array of option objects to be displayed in the select component.
   * Each option object has a label, value, and an optional icon.
   */
  options: {
    /** The text to display for the option. */
    label: string;
    /** The unique value associated with the option. */
    value: string;
    /** Optional icon component to display alongside the option. */
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}

const MulabSelect = <T extends FieldValues>({
    control,
    name,
    placeholder = "Select Option",
    label,
    description, 
    options }: InputProps<T>) => {
    return (
            <FormField
                control={control}
                name={name}
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                        <FormLabel className="form-label">
                            {label}
                        </FormLabel>
                        <FormDescription >
                                {description}
                            </FormDescription>
                     
                        <div className='flex w-full flex-col'>
                            <Select onValueChange={field.onChange} defaultValue={field.value} >
                                <FormControl>
                                    <SelectTrigger className='h-8'>
                                        <SelectValue  className='text-sm font-light' placeholder={<span className="text-muted-foreground font-light">{placeholder}</span>} />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                   {
                                    options.map(r=>{
                                        return <SelectItem  key={r.label} value={r.value}>{r.label}</SelectItem>
                                    })
                                   }
                                </SelectContent>
                             </Select>
                            
                            <FormMessage className="form-message mt-2 text-red-600" />
                        </div>
                    </FormItem>
                )}
            />
    )
}

export default MulabSelect
