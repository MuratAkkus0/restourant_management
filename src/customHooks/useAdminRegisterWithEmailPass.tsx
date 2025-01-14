import registerWithEmailPass from '@/services/firebase/registerNewPerson';
import { setIsAppLoading } from '@/store/slices/appConfigSlice';
import { setIsLoading } from '@/store/slices/onAuthChangeState';
import { RegisterServiceProps } from '@/types/models/services/RegisterNewPersonalModels';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const useAdminRegisterWithEmailPass = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const adminRegisterWithEmailPass = async (data: RegisterServiceProps) => {
    try {
      dispatch(setIsLoading(true));
      dispatch(setIsAppLoading(true));
      await registerWithEmailPass(data);
      toast.success('Register successfull !');
      navigate('/login');
    } catch (error: any) {
      console.log(error);
      throw error;
    } finally {
      dispatch(setIsLoading(false));
      dispatch(setIsAppLoading(false));
    }
  };
  return adminRegisterWithEmailPass;
};
