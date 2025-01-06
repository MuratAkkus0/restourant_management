import * as yup from 'yup';
const reqMes = 'This field is required!';
const passwordRules = /^(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?.,&-_]{8,}$/;
const nameRules = /^[A-Za-z]+$/;
export const RegisterFormSchema = yup.object().shape({
  name: yup
    .string()
    .matches(nameRules, 'Name can have only characters !')
    .required(reqMes),
  surname: yup
    .string()
    .matches(nameRules, 'Name can have only characters !')
    .required(reqMes),
  email: yup.string().email().required(reqMes),
  pass: yup
    .string()
    .min(6, 'Password have to be min. 6 character!')
    .max(18, 'Password have to be max. 18 character.')
    .matches(
      passwordRules,
      'Password must have min 1 lower case letter and 1 numeric digit !'
    )
    .required(reqMes),
  passConfirm: yup
    .string()
    .oneOf([yup.ref('pass'), undefined], 'Passwords must match !')
    .required('Please confirm your password !'),
  street: yup.string().required(reqMes),
  houseNo: yup.string().required(reqMes),
  state: yup.string().required(reqMes),
  postalCode: yup.string().required(reqMes),
  city: yup.string().required(reqMes),
  businessName: yup.string().required(reqMes),
});
