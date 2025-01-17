import { MdDeleteForever } from 'react-icons/md';
import FunctionalCopyIcon from './FunctionalCopyIcon';
import FunctionalActiveDeactiveIcon from './FunctionalActiveDeactiveIcon';
import { deleteDocument } from '@/features/authentication/deleteDocument';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebase/FirebaseConfig';

export interface LinkListItemProps {
  link: string;
  isValid: boolean;
}
const LinkListItem: React.FC<LinkListItemProps> = ({ link, isValid }) => {
  const searchParams = new URLSearchParams(link.split('?')[1]);
  const accessKey = searchParams.get('key');
  const companyId = searchParams.get('cId');

  const handleDelete = async () => {
    // collectionName: string, docId: string
    console.log(link);

    try {
      const collectionRef = collection(
        db,
        `companies/${companyId}/registerationLinks`
      );

      const q = query(collectionRef, where('key', '==', accessKey));
      const querySnapshot = await getDocs(q);
      const docSnap = querySnapshot.docs[0];

      if (docSnap.exists()) {
        // const docRef = doc(db,`companies/${companyId}/registerationLinks`,docSnap.id);
        await deleteDocument(
          `companies/${companyId}/registerationLinks`,
          docSnap.id
        );
      } else {
        console.log('Document don`t exists.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full p-4 bg-white shadow-lg rounded-lg flex justify-evenly items-center gap-4">
        <p className="sm:max-w-sm md:max-w-60 lg:max-w-lg max-w-[58rem] text-sm md:text-base text-gray-500 hover:text-black truncate">
          {link}
        </p>
        <FunctionalActiveDeactiveIcon isValid={isValid} />
        <div className="flex-shrink-0 flex items-center text-right cursor-pointer">
          <MdDeleteForever
            onClick={handleDelete}
            className="text-red-600 hover:scale-110 transition"
            size={25}
          />
          <FunctionalCopyIcon
            textToCopy={link}
            className="text-red-600 border-none"
          />
        </div>
      </div>
    </>
  );
};

export default LinkListItem;
