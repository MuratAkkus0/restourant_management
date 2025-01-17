import { db } from '@/firebase/FirebaseConfig';
import { DocumentData } from 'firebase-admin/firestore';
import { collection, onSnapshot } from 'firebase/firestore';

export type GetAllRegisterLinksFunc = (companyId: string) => DocumentData[];

const getAllRegisterLinks: GetAllRegisterLinksFunc = (companyId) => {
  let result: DocumentData[] = [];
  const registerLinkColRef = collection(
    db,
    'companies',
    companyId,
    'registerationLinks'
  );
  onSnapshot(registerLinkColRef, (snapshot) => {
    console.log('active');
    if (companyId) {
      const registerLinks = snapshot.docs.map((item) => item.data());
      if (registerLinks.length) {
        result = registerLinks;
        console.log(result);
      }
    }
  });
  return result;
  // console.log(registerLinkColRef);
  // const registerLinksSnapshot = await getDocs(registerLinkColRef);
  // if (!registerLinksSnapshot.empty) {
  //   const registerLinksData = registerLinksSnapshot.docs.map((item) =>
  //     item.data()
  //   );
  //   return registerLinksData;
  // } else return [];
};

export default getAllRegisterLinks;
