import * as yup from 'yup'
export const schema = yup
   .object({
      email: yup.string().email().required(),
      image: yup.string().url().required(),
      username: yup.string().min(4).max(20).required(),
      bio: yup.string(),
   })
   .required()
