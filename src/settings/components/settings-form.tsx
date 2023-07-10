import { FormProvider, useForm } from 'react-hook-form'
import { UserInterface } from '../../models'
import { TOKEN_KEY, useLocalStorage } from '../../shared/lib'
import { useMutation } from 'react-query'
import { UserInfoUpdate } from '../../api'
import { Label } from '../../shared/ui/label'
import { Button, Input } from '../../shared/ui'
import { Spinner } from '../../shared/ui/spinner'
import { FormContainer } from '../../shared/form-container'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from './schema'

type Props = {
   initialValue: UserInterface
}

export default function SettingsFormComponent({ initialValue }: Props) {
   const { get } = useLocalStorage()
   const form = useForm<Omit<UserInterface, 'token'>>({
      defaultValues: {
         email: initialValue.email,
         image: initialValue.image,
         username: initialValue.username,
         bio: initialValue.bio,
      },
      resolver: yupResolver(schema),
   })
   const { mutate, isError, error, isLoading, isSuccess } = useMutation({
      mutationFn: UserInfoUpdate,
   })

   const handleUpdate = (data: Omit<UserInterface, 'token'>) => {
      const token = get(TOKEN_KEY)
      mutate({ data, token })
   }

   const isValid = form.formState.isValid
   const isSubmitted = form.formState.isSubmitted
   const disabled = (isSubmitted && !isValid) || isLoading

   return (
      <FormContainer title='Settings'>
         <FormProvider {...form}>
            <form
               onSubmit={form.handleSubmit(handleUpdate)}
               className='flex flex-col gap-2 w-3/5 h-full'
            >
               {isError && <p className='text-red-500 px-2'>{String(error)}</p>}
               {isSuccess && (
                  <p className='px-2 text-gray-500 font-medium text-lg text-right'>
                     🐥 Successfully updated
                  </p>
               )}
               <>
                  <Label title='Email'>
                     <Input field='email' placeholder='mail@mail.com' />
                  </Label>
                  <Label title='Picture'>
                     <Input field='image' placeholder='it has to be a link' />
                  </Label>
                  <div className='flex flex-col items-start gap-1'>
                     <Label title='Username'>
                        <Input field='username' placeholder='your unique nickname' />
                     </Label>
                     <span className='text-gray-500 font-medium text-sm px-2'>
                        remember, username must be unique
                     </span>
                  </div>
                  <Label title='Biography'>
                     <Input field='bio' placeholder='describe yourself' />
                  </Label>
                  <Button disabled={disabled} type='submit' variant='green'>
                     <div className='w-full h-full flex flex-row items-center justify-center gap-1'>
                        {isLoading && <Spinner width={2} height={2} />}
                        Update
                     </div>
                  </Button>
               </>
            </form>
         </FormProvider>
      </FormContainer>
   )
}
