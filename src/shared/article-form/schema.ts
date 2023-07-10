import * as yup from 'yup'
export const schema = yup
   .object({
      title: yup.string().required().min(4).required(),
      description: yup.string().max(20),
      body: yup.string().min(10).required(),
      tagList: yup.string(),
   })
   .required()
