import { ReactNode, FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

const StorybookFormProvider: FC<{ children: ReactNode }> = ({ children }) => {
   const methods = useForm()
   return <FormProvider {...methods}>{children}</FormProvider>
}

export const withRHF = () => (Story: FC) =>
   (
      <StorybookFormProvider>
         <Story />
      </StorybookFormProvider>
   )
