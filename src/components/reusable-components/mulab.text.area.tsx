import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'
import { Control, FieldPath, FieldValues } from 'react-hook-form'

type InputProps<T extends FieldValues> = {
    label: string
    description?: string
    name: FieldPath<T>
    control: Control<T>
    placeholder: string
    type?: string
}

const MulabTextArea = <T extends FieldValues>({ control, name, placeholder, label, description, type }: InputProps<T>) => {
    return (
            <FormField
                control={control}
                name={name}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="form-label">
                            {label}
                        </FormLabel>
                        <FormDescription >
                                {description}
                            </FormDescription>
                     
                        <div className='flex w-full flex-col'>
                            <FormControl>
                                <Textarea placeholder={placeholder} {...field} />
                            </FormControl>
                            
                            <FormMessage className="form-message mt-2 text-red-600" />
                        </div>
                    </FormItem>
                )}
            />
    )
}

export default MulabTextArea