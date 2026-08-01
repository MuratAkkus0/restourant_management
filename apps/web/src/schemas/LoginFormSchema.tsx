import * as yup from 'yup';
const reqMes = 'This field is required!';
const passwordRules: RegExp = /^(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?.,&-_]{8,}$/;
export const LoginFormSchema = yup.object().shape({
  email: yup.string().email().required(reqMes),
  pass: yup
    .string()
    .min(8, 'Password have to be min. 8 characters!')
    .max(18, 'Password have to be max. 18 character.')
    .matches(
      passwordRules,
      'Password must have min 1 lower case letter and 1 numeric digit !'
    )
    .required(reqMes),
});
