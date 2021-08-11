import * as Yup from 'yup'
import {
  useSelector
} from 'react-redux'

const useValidation = () => {
  const state = useSelector(state => state.editTile)

  const validationSchema = [
    Yup.object().shape({
      title: Yup.string()
        .required('Поле є обов\'язковим')
        .min(2, 'Довжина поля не менше як 5 символів')
        .max(50, 'Довжина поля не більше як 150 символів'),
      images: Yup.array()
        .test('images', 'Поле є обов\'язковим',
          function (value) {
            if (state.imagesPreview.length === 0 && value.length === 0) return false

            return true
          },
        ),
    }),
    Yup.object().shape({
      width: Yup.number()
        .required('Поле є обов\'язковим')
        .integer('Допустимі тільки цілі числа')
        .positive('Доступні тільки додатні числа')
        .min(1, 'Недопустиме мінімальне значення поля')
        .max(9999, 'Недопустиме максимальне значення поля'),
      height: Yup.number()
        .required('Поле є обов\'язковим')
        .integer('Допустимі тільки цілі числа')
        .positive('Доступні тільки додатні числа')
        .min(1, 'Недопустиме мінімальне значення поля')
        .max(9999, 'Недопустиме максимальне значення поля'),
      thickness: Yup.number()
        .required('Поле є обов\'язковим')
        .integer('Допустимі тільки цілі числа')
        .positive('Доступні тільки додатні числа')
        .min(1, 'Недопустиме мінімальне значення поля')
        .max(9999, 'Недопустиме максимальне значення поля'),
      weight: Yup.number()
        .required('Поле є обов\'язковим')
        .integer('Допустимі тільки цілі числа')
        .positive('Доступні тільки додатні числа')
        .min(1, 'Недопустиме мінімальне значення поля')
        .max(9999, 'Недопустиме максимальне значення поля'),
      quantity: Yup.number()
        .required('Поле є обов\'язковим')
        .integer('Допустимі тільки цілі числа')
        .positive('Доступні тільки додатні числа')
        .min(1, 'Недопустиме мінімальне значення поля')
        .max(9999, 'Недопустиме максимальне значення поля'),
    }),
    Yup.object().shape({
      prices: Yup.object({
        color: Yup.string()
          .required('Поле є обов\'язковим')
          .max(25, 'Довжина поля не більше як 50 символів'),
        price: Yup.number()
          .required('Поле є обов\'язковим')
          .integer('Допустимі тільки цілі числа')
          .positive('Доступні тільки додатні числа')
          .min(1, 'Недопустиме мінімальне значення поля')
          .max(9999, 'Недопустиме максимальне значення поля'),
      })
    }),
  ]

  return {
    validationSchema
  }
}

export default useValidation