import { FormProvider, useForm } from 'react-hook-form'
import { UserInterface } from '../../models'
import { useMutation } from 'react-query'
import { UserInfoUpdate } from '../../api'
import { FormContainer } from '../../shared/form-container'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from './schema'
import { UseToken } from '../../shared/lib/use-token'
import { SettingsFormLayout } from './settings-form-layout'

export default function SettingsFormComponent({ initialValue }: { initialValue: UserInterface }) {
   const token = UseToken()
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
      mutate({ data, token })
   }

   const { isValid } = form.formState
   const { isSubmitted } = form.formState
   const disabled = (isSubmitted && !isValid) || isLoading

   return (
      <FormContainer title='Settings'>
         <FormProvider {...form}>
            <SettingsFormLayout
               onSubmit={form.handleSubmit(handleUpdate)}
               isError={isError}
               isLoading={isLoading}
               isSuccess={isSuccess}
               error={String(error)}
               disabled={disabled}
            />
         </FormProvider>
      </FormContainer>
   )
}
