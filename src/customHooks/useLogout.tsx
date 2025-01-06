import { auth } from '@/firebase/useFirebase';
import { toast } from 'sonner';

export const useLogout = () => {
  const logout = () => {
    auth
      .signOut()
      .then(() => toast.success('Logout successfull !'))
      .catch((err) => toast.error(err.code));
  };
  return logout;
};
