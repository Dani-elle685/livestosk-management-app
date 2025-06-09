'use client' 
import { useForm, FieldValues } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Cat, Dog, Fish, Rabbit, Turtle } from "lucide-react";
import MulabInput from './mulab.custom.input'
import MulabCustomAutocomplete from './mulab.custom.autocomplete'
import MulabTextArea from './mulab.text.area'
import MulabMultiselect from './mulab.multiselect'
import MulabSelect from './mulab.select'
import MulabSwitch from './mulab.switch'
import SubmitButton from './submit.button'


interface FormData extends FieldValues {
    email: string
    password: string
    
}
declare type formProps = {
    onSuccess?:()=> void
}

const ExampleForm: React.FC<formProps> = ({onSuccess}) => {

    
    //define the schema for the form
    const schema = z.object({
        email: z.string().email(),
        password: z.string().min(8),
        language: z.string().min(2),
        framework: z.array(z.string().min(2)).min(1),
        status: z.boolean()
    })

     type schemaType= z.infer<typeof schema>
    // Initialize form with defaultValues
    const form = useForm<schemaType>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: '',
            password: '',
            language: '',
            status: false

        }
    })

       // Sample items for the autocomplete
       const languageOptions = [
        { label: 'JavaScript', value: 'js' },
        { label: 'TypeScript', value: 'ts' },
        { label: 'Python', value: 'py' },
        { label: 'Java', value: 'java' },
        { label: 'C++', value: 'cpp' }
    ]

    const onSubmit = async (data: schemaType) => {
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(data)
        onSuccess?.()
        
    }
    const { isSubmitting , isLoading, isValid} = form.formState
    //const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>(["react", "angular"]);
    const frameworksList = [
        { value: "react", label: "React", icon: Turtle },
        { value: "angular", label: "Angular", icon: Cat },
        { value: "vue", label: "Vue", icon: Dog },
        { value: "svelte", label: "Svelte", icon: Rabbit },
        { value: "ember", label: "Ember", icon: Fish },
      ];
    return (
        <Form {...form}> {/* Wrap with Form component and spread form props */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div>
                        <MulabInput
                            control={form.control}
                            name="email"
                            label="Email Address"
                            description="Enter your email address"
                            placeholder="example@email.com"
                            type="email"
                        />

                        <MulabInput
                            control={form.control}
                            name="password"
                            label="Password"
                            description="Enter your password"
                            placeholder="••••••••"
                            type="password"
                        />
                </div>
                

                <div>
                        <MulabCustomAutocomplete
                            control={form.control}
                            name="language"
                            label="Programming Language"
                            description="Select your preferred programming language"
                            placeholder="Select a language"
                            items={languageOptions}
                        />

            
                </div>
                <div>
                    <MulabTextArea
                        control={form.control}
                        name="password"
                        label="Password"
                        description="Enter your password"
                        placeholder="••••••••"
                        type="password"
                    />

                <MulabMultiselect
                    options={frameworksList}
                    control={form.control}
                    defaultValue={form.getValues("framework")}
                    placeholder="Select frameworks"
                    variant="custom"
                    animation={2}
                    maxCount={3}
                    className='text-sky-950'
                    label={'Mulab'} 
                    description="Mulab is good"
                    name="framework"
             />

             <MulabSelect 
                    control={form.control}
                    options={frameworksList}
                    name='email'
                    label={'Mulab'}
                    description="Mulab is good" 
                    placeholder={'Select Items'} 
                />
            </div>

                <MulabSwitch
                control={form.control}
                name="status"
                label="Active Status"
                description="Toggle whether this item is active."
                />
        
            <SubmitButton isSubmitting={isSubmitting} isValid={isValid}/>
               
            </form>
        </Form>
    )
}

export default ExampleForm