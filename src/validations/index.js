import * as yup from 'yup'

export const validations = {
  loginAuth: yup
    .string()
    .matches(/^[a-zA-Z0-9]+$/g, "Faqatgina harf va sonlardan iborat bo'lgan belgi kiriting")
    .required("To'ldirilishi shart maydon")
    .min(6, "Bu maydon kamida 6 ta belgidan iborat bo'lishi kerak"),
  string: yup.string().required("To'ldirilishi shart maydon"),
  mixed: yup.mixed().required("To'ldirilishi shart maydon"),
  login: yup
    .string()
    .required("To'ldirilishi shart maydon")
    .min(6, "Bu maydon kamida 6 ta belgidan iborat bo'lishi kerak"),
  select: yup.object().shape({
    label: yup.string().required(),
    value: yup.string().required(),
  }),
  phone: yup.string().required("To'ldirilishi shart maydon").length(9, "Telefon raqamini to'g'ri kiriting"),
  pinfl: yup
    .string()
    .required("To'ldirilishi shart maydon")
    .test('len', 'JShShIR 14 raqamdan iborat bo’lishi kerak', (val) => val.replaceAll('_', '').length === 14),
  passport_number: yup
    .string()
    .required("To'ldirilishi shart maydon")
    .test('len', "To'liq kiritilishi kerak", (val) => val.replaceAll('_', '').length === 10),
  number: yup
    .string()
    .matches(/^[0-9]*$/g, 'faqatgina raqam kirita olasiz')
    .required("To'ldirilishi shart maydon"),
  sms: yup.string().required("To'ldirilishi shart maydon").length(4, "SMS kodini to'g'ri kiriting"),
}
