import { auth } from '@/firebase/FirebaseConfig';
import { toast } from 'sonner';

export const useLogout = () => {
  const logout = async () => {
    console.log('useLogout active');
    await auth
      .signOut()
      .then(() => toast.success('Logout successfull !'))
      .catch((err) => toast.error(err.code));
  };
  return logout;
};
