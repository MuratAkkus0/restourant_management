import registerWithEmailPass from '@/services/firebase/registerNewPersonal';
import { setIsAppLoading } from '@/store/slices/appConfigSlice';
import { setIsLoading } from '@/store/slices/onAuthChangeState';
import { RegisterServiceProps } from '@/types/models/services/RegisterNewPersonalModels';
import { useDispatch } from 'react-redux';

export const usePersonalRegisterWithEmailPass = () => {
  const dispatch = useDispatch();
  const personalRegisterWithEmailPass = async (data: RegisterServiceProps) => {
    try {
      dispatch(setIsLoading(true));
      dispatch(setIsAppLoading(true));
      await registerWithEmailPass(data);
    } catch (error: any) {
      console.log(error);
      throw error;
    } finally {
      dispatch(setIsLoading(false));
      dispatch(setIsAppLoading(false));
    }
  };
  return personalRegisterWithEmailPass;
};
