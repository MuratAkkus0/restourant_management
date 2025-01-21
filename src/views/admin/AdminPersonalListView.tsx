import Pharagrapf from '@/components/atoms/Pharagrapf';
import ListWithControlsButtonContainer from '@/components/molecules/ListWithControls/ListWithControlsButtonContainer';
import ListWithControlsContainer from '@/components/molecules/ListWithControls/ListWithControlsContainer';
import ListWithControlsItem from '@/components/molecules/ListWithControls/ListWithControlsItem';
import TitleCardWithIcon from '@/components/molecules/TitleCardWithIcon';
import { db } from '@/firebase/FirebaseConfig';
import { fetchDocuments } from '@/services/firebase/fetchDocuments';
import { RootState } from '@/store/store';
import { DocumentData } from 'firebase-admin/firestore';
import { deleteDoc, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { IoPerson } from 'react-icons/io5';
import { MdDeleteForever } from 'react-icons/md';
import { PiUserListFill } from 'react-icons/pi';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

export const AdminPersonalListView = () => {
  const userData = useSelector((store: RootState) => store.onAuthChangeState);
  const [listData, setListData] = useState<DocumentData[]>([]);
  const companyId = userData.companyId;
  useEffect(() => {
    if (!companyId) return;
    let unsub: any = null;
    const listener = async () => {
      try {
        const unsubscribe = await fetchDocuments(
          ['companies', companyId, 'personals'],
          setListData,
          {
            realTime: true,
          }
        );
        unsub = unsubscribe;
      } catch (error) {
        console.log('Error during fetching link list: ' + error);
      }
    };
    listener();
    return () => {
      unsub?.();
    };
  }, []);

  useEffect(() => {
    console.log(listData);
  }, [listData]);

  const handleDelete = async (personalId: string) => {
    try {
      const docRef = doc(db, `companies/${companyId}/personals/${personalId}`);
      console.log(docRef);
      await deleteDoc(docRef);
      toast.success('Personal successfuly deleted.');
    } catch (error) {
      console.log(error);
      toast.error('An error occured during deleting personal: ' + error);
    }
  };

  return (
    <>
      <TitleCardWithIcon
        text="Personal List"
        Icon={PiUserListFill}
        iconSize={30}
        textSize="base"
      />
      <ListWithControlsContainer>
        {listData.map((item, key) => (
          <ListWithControlsItem key={key}>
            <div className="flex gap-2 items-center">
              <IoPerson />
              <Pharagrapf className="truncate min-w-28" size="base">
                {item.name} {item.surname}
              </Pharagrapf>
            </div>

            <ListWithControlsButtonContainer>
              <MdDeleteForever
                onClick={() => handleDelete(item.id)}
                className="text-red-600 size-6 min-w-8"
              />
            </ListWithControlsButtonContainer>
          </ListWithControlsItem>
        ))}
      </ListWithControlsContainer>
    </>
  );
};
