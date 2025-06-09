'use client'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Check, ChevronsUpDown } from 'lucide-react'
import React from 'react'
import { Control, FieldPath, FieldValues } from 'react-hook-form'

type InputProps<T extends FieldValues> = {
    label: string
    description: string
    name: FieldPath<T>
    control: Control<T>
    placeholder: string
    items: { label: string; value: string }[]
    classname?: string
    onChange?: (value: string) => void
    defaultValue?: string
    disabled?: boolean
    asChild?: boolean
}
/**
 * MulabCustomAutocomplete is a reusable form input component that provides an autocomplete/dropdown functionality
 * with search capabilities.
 *
 * @component
 * @template T - Type extending FieldValues from react-hook-form
 * 
 * @param {Object} props - Component props
 * @param {Control<T>} props.control - React Hook Form control object
 * @param {FieldPath<T>} props.name - Name of the form field
 * @param {string} props.placeholder - Placeholder text for the input
 * @param {string} props.label - Label text for the form field
 * @param {string} props.description - Description text shown below the label
 * @param {Array<{label: string, value: string}>} props.items - Array of items to display in dropdown
 * @param {string} [props.classname] - Optional CSS class names to apply
 * @param {(value: string) => void} [props.onChange] - Optional callback when value changes
 * @param {string} [props.defaultValue] - Optional default value
 * @param {boolean} [props.disabled=false] - Whether the input is disabled
 * @param {boolean} [props.asChild] - Whether to render as child component
 *
 * @example
 * ```tsx
 * <MulabCustomAutocomplete
 *   control={form.control}
 *   name="fieldName"
 *   label="Select an option"
 *   description="Choose from the list"
 *   placeholder="Select..."
 *   items={[
 *     { label: "Option 1", value: "opt1" },
 *     { label: "Option 2", value: "opt2" }
 *   ]}
 * />
 * ```
 */

const MulabCustomAutocomplete = <T extends FieldValues>({
    control,
    name,
    placeholder,
    label,
    description,
    items,
    classname,
    onChange,
    defaultValue,
    disabled = false,
}: InputProps<T>) => {
    const [open, setOpen] = React.useState(false)

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={cn("flex flex-col", classname)}>
                    <FormLabel>{label}</FormLabel>
                    <FormDescription>{description}</FormDescription>
                    <Popover open={open} onOpenChange={setOpen} modal={true}>
                        <PopoverTrigger asChild disabled={disabled}>
                            <FormControl className='text-sm font-normal placeholder:font-light'>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                        "w-full justify-between h-8",
                                        !field.value && "text-muted-foreground"
                                    )}
                                >
                                    {defaultValue
                                        ? items.find(item => item.value === defaultValue)?.label
                                        : field.value
                                            ? items.find(item => item.value === field.value)?.label
                                            : placeholder}
                                    <ChevronsUpDown className="opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0" style={{ zIndex: 9999 }}>
                            <Command>
                                <CommandInput
                                    placeholder={placeholder}
                                    className="h-9"
                                />
                                <CommandList>
                                    <CommandEmpty>No items found.</CommandEmpty>
                                    <CommandGroup>
                                        {items.map((item: { value: string; label: string }) => (
                                            <CommandItem
                                                key={item.value}
                                                value={item.value}
                                                onSelect={() => {
                                                    field.onChange(item.value)
                                                    onChange?.(item.value)
                                                    setOpen(false)
                                                }}
                                                className="cursor-pointer hover:bg-accent"
                                            >
                                                {item.label}
                                                <Check
                                                    className={cn(
                                                        "ml-auto h-4 w-4",
                                                        item.value === field.value
                                                            ? "opacity-100"
                                                            : "opacity-0"
                                                    )}
                                                />
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default MulabCustomAutocomplete
