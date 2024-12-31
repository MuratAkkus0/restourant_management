import * as yup from 'yup';
const reqMes = 'This field is required!';
const passwordRules: RegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?.,&])[A-Za-z\d@$!%*?.,&]{8,}$/;
export const LoginFormSchema = yup.object().shape({
  email: yup.string().email().required(reqMes),
  pass: yup
    .string()
    .min(6, 'Password have to be min. 6 character!')
    .max(18, 'Password have to be max. 18 character.')
    .matches(
      passwordRules,
      'Password must have min 1 upper case letter, 1 lower case letter, 1 numeric digit and 1 special character (!@$!%*?.,&) '
    )
    .required(reqMes),
});
