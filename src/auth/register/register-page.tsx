import { yupResolver } from '@hookform/resolvers/yup'
import { RegisterFormInterface } from './types'
import { schema } from './schema'
import { FormProvider, useForm } from 'react-hook-form'
import { FormContainer } from '../../shared/form-container'
import { Button, Input } from '../../shared/ui'
import { TOKEN_KEY, useAuthStore, useLocalStorage } from '../../shared/lib'
import { useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'
import { UserRegister } from '../../api'
import { UserInterface } from '../../models'
import { PasswordInput } from '../../shared/ui/input'

export default function RegisterPage() {
   // @ts-ignore
   const methods = useForm<RegisterFormInterface>({ resolver: yupResolver(schema) })
   const navigate = useNavigate()
   const { login, user } = useAuthStore()
   if (!!user) {
      navigate('/')
   }
   const { set } = useLocalStorage()
   const { mutate, isLoading, isError, error } = useMutation({ mutationFn: UserRegister })
   const onSubmit = (data: RegisterFormInterface) => {
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
      <FormContainer
         isRedirect
         title='Sign up'
         redirectPath='/login'
         redirectTitle='Switch to sign in'
      >
         <FormProvider {...methods}>
            <form
               onSubmit={methods.handleSubmit(onSubmit)}
               className='flex flex-col gap-2 w-2/5 mt-8'
            >
               {isError && <p className='text-red-500 px-2'>{String(error)}</p>}
               <Input field='username' placeholder='username' type='text' />
               <Input field='email' placeholder='email@mail.com' type='email' />
               <PasswordInput field='password' placeholder='password' />
               <Button disabled={disabled} type='submit' variant='green' classname='ml-auto w-20'>
                  Sign up
               </Button>
            </form>
         </FormProvider>
      </FormContainer>
   )
}
