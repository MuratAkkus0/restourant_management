import { db } from '@/firebase/FirebaseConfig';
import { DocumentData } from 'firebase-admin/firestore';
import { collection, getDocs } from 'firebase/firestore';

export type GetAllRegisterLinksFunc = (
  companyId: string
) => Promise<DocumentData[]>;

const getAllRegisterLinks: GetAllRegisterLinksFunc = async (companyId) => {
  const registerLinkColRef = collection(
    db,
    'companies',
    companyId,
    'registerationLinks'
  );
  console.log(registerLinkColRef);
  const registerLinksSnapshot = await getDocs(registerLinkColRef);
  if (!registerLinksSnapshot.empty) {
    const registerLinksData = registerLinksSnapshot.docs.map((item) =>
      item.data()
    );
    return registerLinksData;
  } else return [];
};

export default getAllRegisterLinks;
