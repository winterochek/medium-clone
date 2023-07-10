import * as yup from 'yup'

export const schema = yup
   .object({
      email: yup.string().email().required(),
      password: yup.string().min(8).max(20),
      username: yup.string().min(4).required(),
   })
   .required()
