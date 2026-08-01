import { auth } from '@/firebase/FirebaseConfig';
import { updateProfile } from 'firebase/auth';

export const updateUserDisplayName = async (
  firstName: string,
  lastName: string
) => {
  if (auth.currentUser) {
    await updateProfile(auth.currentUser, {
      displayName: `${firstName} ${lastName}`,
    });
  }
};
