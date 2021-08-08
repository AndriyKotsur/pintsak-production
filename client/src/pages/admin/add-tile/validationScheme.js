import * as Yup from 'yup'

const validationScheme = [
  Yup.object().shape({
    title: Yup.string()
      .min(5, 'Довжина поля не менше як 5 символів')
      .max(150, 'Довжина поля не більше як 150 символів')
      .required('Поле є обов\'язковим'),
    images: Yup.array()
      .min(1, 'Додайте один або більше файлів!')
      .required('Поле є обов\'язковим')
  }),
  Yup.object().shape({
    weight: Yup.string()
      .max(50, 'Довжина поля не більше як 50 символів')
      .required('Поле є обов\'язковим'),
    quantity: Yup.string()
      .max(50, 'Довжина поля не більше як 50 символів')
      .required('Поле є обов\'язковим'),
    width: Yup.string()
      .max(50, 'Довжина поля не більше як 50 символів')
      .required('Поле є обов\'язковим'),
    height: Yup.string()
      .max(50, 'Довжина поля не більше як 50 символів')
      .required('Поле є обов\'язковим'),
    thickness: Yup.string()
      .max(50, 'Довжина поля не більше як 50 символів')
      .required('Поле є обов\'язковим')
  }),
  Yup.object().shape({
    colors: Yup.string()
      .min(5, 'Довжина поля не менше як 5 символів')
      .max(150, 'Довжина поля не більше як 150 символів')
      .required('Поле є обов\'язковим'),
  }),
]

export default validationScheme