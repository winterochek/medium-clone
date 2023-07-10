import { TOKEN_KEY, useAuthStore, useLocalStorage } from '../../shared/lib'
import { Button, Input } from '../../shared/ui'
import { FormProvider, useForm } from 'react-hook-form'
import { LoginFormInterface } from './types'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from './schema'
import { FormContainer } from '../../shared/form-container'
import { useMutation } from 'react-query'
import { UserLogin } from '../../api'
import { UserInterface } from '../../models'
import { useNavigate } from 'react-router-dom'
import { PasswordInput } from '../../shared/ui/input'

export default function LoginPage() {
   const methods = useForm<LoginFormInterface>({ resolver: yupResolver(schema) })
   const navigate = useNavigate()
   const { login, user } = useAuthStore()
   if (!!user) {
      navigate('/')
   }
   const { set } = useLocalStorage()
   const { mutate, isLoading, isError, error } = useMutation({ mutationFn: UserLogin })
   const onSubmit = (data: LoginFormInterface) => {
      mutate(data, {
         onSuccess: onSuccess,
      })
   }

   const onSuccess = (data: unknown) => {
      const { user } = data as { user: UserInterface }
      set(TOKEN_KEY, user.token)
      login(user)
      navigate('/')
   }

   const isValid = methods.formState.isValid
   const isSubmitted = methods.formState.isSubmitted
   const disabled = (isSubmitted && !isValid) || isLoading

   return (
      <FormContainer isRedirect title='Sign in' redirectPath='/register' redirectTitle='Switch to sign up'>
         <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className='flex flex-col gap-2 w-3/5'>
               {isError && <p className='text-red-500 px-2'>{String(error)}</p>}
               <Input field='email' placeholder='email@mail.com' type='email' />
               <PasswordInput field='password' placeholder='password' />
               <Button disabled={disabled} type='submit'>
                  Sign in
               </Button>
            </form>
         </FormProvider>
      </FormContainer>
   )
}
