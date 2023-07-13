import * as yup from 'yup'
export const schema = yup
   .object({
      body: yup.string().min(4).max(40),
   })
   .required()
