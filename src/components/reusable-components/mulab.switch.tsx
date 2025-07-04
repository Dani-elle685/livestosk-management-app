import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import React from 'react'
import { Control, FieldPath, FieldValues } from 'react-hook-form'

type SwitchProps<T extends FieldValues> = {
    label: string
    description: string
    name: FieldPath<T>
    control: Control<T>
    placeholder?: string
  }
  
  const MulabSwitch = <T extends FieldValues>({
    control,
    name,
    label,
    description,
  }: SwitchProps<T>) => {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-1">
              <FormLabel>{label}</FormLabel>
              <FormDescription>{description}</FormDescription>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />
    )
  }
  
  
export default MulabSwitch