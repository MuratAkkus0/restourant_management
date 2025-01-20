import { MdDeleteForever } from 'react-icons/md';
import FunctionalCopyIcon from './FunctionalCopyIcon';
import FunctionalActiveDeactiveIcon from './FunctionalActiveDeactiveIcon';
import { deleteDocument } from '@/features/authentication/deleteDocument';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebase/FirebaseConfig';
import FunctionalCopyText from './FunctionalCopyText';
import { MouseEvent, useState } from 'react';
import ListWithControlsItem from '../molecules/ListWithControls/ListWithControlsItem';
import ListWithControlsButtonContainer from '../molecules/ListWithControls/ListWithControlsButtonContainer';
import Pharagrapf from './Pharagrapf';

export interface LinkListItemProps {
  link: string;
  isValid: boolean;
}
const LinkListItem: React.FC<LinkListItemProps> = ({ link, isValid }) => {
  const searchParams = new URLSearchParams(link.split('?')[1]);
  const accessKey = searchParams.get('key');
  const companyId = searchParams.get('cId');
  const [position, setPosition] = useState({ x: 0, y: 0 });

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

  const copyOnClick = (e: MouseEvent<HTMLParagraphElement>) => {
    const newPosition = { x: e.clientX, y: e.clientY };
    setPosition(newPosition);
  };

  return (
    <>
      <FunctionalCopyText
        text={link}
        clientX={position.x}
        clientY={position.y}
      />
      <ListWithControlsItem>
        <Pharagrapf
          onClick={copyOnClick}
          className="sm:max-w-md md:max-w-64 lg:max-w-lg max-w-[58rem] hover:text-black truncate"
          size="sm"
        >
          {link}
        </Pharagrapf>

        <FunctionalActiveDeactiveIcon isValid={isValid} />
        <ListWithControlsButtonContainer>
          <FunctionalCopyIcon
            textToCopy={link}
            className="text-red-600 border-none"
          />
          <MdDeleteForever
            onClick={handleDelete}
            className="text-red-600 hover:scale-110 transition"
            size={25}
          />
        </ListWithControlsButtonContainer>
      </ListWithControlsItem>
    </>
  );
};

export default LinkListItem;
