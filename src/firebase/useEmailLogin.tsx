import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'sonner';
import { auth } from './useFirebase';
import { FirebaseError } from 'firebase/app';

function useEmailLogin(email: string, pass: string) {
  try {
    signInWithEmailAndPassword(auth, email, pass).then((userCredential) =>
      console.log(userCredential.user)
    );

    toast.success('Login Successfull!');
  } catch (error) {
    if (error instanceof FirebaseError) {
      const errCode: string = error.code;
      toast.error('Login Failed! Invalid email or password. ' + errCode);
      return;
    }
    toast.error('Login Failed! An unknown error occured.');
  }
  return;
}

export default useEmailLogin;
