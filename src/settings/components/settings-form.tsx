import { FormProvider, useForm } from 'react-hook-form'
import { UserInterface } from '../../models'
import { useMutation } from 'react-query'
import { UserInfoUpdate } from '../../api'
import { FormContainer } from '../../shared/form-container'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from './schema'
import { UseToken } from '../../shared/lib/use-token'
import { SettingsFormLayout } from './settings-form-layout'
import { Label } from '../../shared/ui/label'
import { Button, Input } from '../../shared/ui'
import { Spinner } from '../../shared/ui/spinner'
import { UseLogout } from '../lib/use-logout'

export default function SettingsFormComponent({ initialValue }: { initialValue: UserInterface }) {
   const token = UseToken()
   const form = useForm<Omit<UserInterface, 'token'>>({
      defaultValues: {
         email: initialValue.email,
         image: initialValue.image,
         username: initialValue.username,
         bio: initialValue.bio,
      },
      // @ts-ignore
      resolver: yupResolver(schema),
   })
   const { mutate, isError, error, isLoading, isSuccess } = useMutation({
      mutationFn: UserInfoUpdate,
   })

   const handleUpdate = (data: Omit<UserInterface, 'token'>) => {
      mutate({ data, token })
   }

   const handleLogout = UseLogout()

   const { isValid } = form.formState
   const { isSubmitted } = form.formState
   const disabled = (isSubmitted && !isValid) || isLoading

   return (
      <FormContainer title='Settings'>
         <FormProvider {...form}>
            <SettingsFormLayout
               onSubmit={form.handleSubmit(handleUpdate)}
               isError={isError}
               isSuccess={isSuccess}
               error={String(error)}
               email={
                  <Label title='Email'>
                     <Input field='email' placeholder='mail@mail.com' />
                  </Label>
               }
               picture={
                  <Label title='Picture'>
                     <Input field='image' placeholder='it has to be a link' />
                  </Label>
               }
               username={
                  <div className='flex flex-col items-start gap-1'>
                     <Label title='Username'>
                        <Input field='username' placeholder='your unique nickname' />
                     </Label>
                     <span className='text-gray-500 font-medium text-sm px-2'>
                        remember, username must be unique
                     </span>
                  </div>
               }
               bio={
                  <Label title='Biography'>
                     <Input field='bio' placeholder='describe yourself' />
                  </Label>
               }
               buttons={
                  <>
                     <Button onClick={handleLogout} variant='danger'>
                        Log out
                     </Button>
                     <Button disabled={disabled} type='submit' variant='green'>
                        <div className='w-full h-full flex flex-row items-center justify-center gap-1'>
                           {isLoading && <Spinner width={2} height={2} />}
                           Update
                        </div>
                     </Button>
                  </>
               }
            />
         </FormProvider>
      </FormContainer>
   )
}
