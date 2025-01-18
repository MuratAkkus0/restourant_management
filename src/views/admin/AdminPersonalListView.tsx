import Pharagrapf from '@/components/atoms/Pharagrapf';
import ListWithControlsButtonContainer from '@/components/molecules/ListWithControls/ListWithControlsButtonContainer';
import ListWithControlsContainer from '@/components/molecules/ListWithControls/ListWithControlsContainer';
import ListWithControlsItem from '@/components/molecules/ListWithControls/ListWithControlsItem';
import AdminPanelsPagesContainer from '@/components/templates/AdminPanelsPagesContainer';
import { fetchDocuments } from '@/services/firebase/fetchDocuments';
import { RootState } from '@/store/store';
import { DocumentData } from 'firebase-admin/firestore';
import { useEffect, useRef, useState } from 'react';
import { CiEdit, CiMenuKebab } from 'react-icons/ci';
import { IoPerson } from 'react-icons/io5';
import { MdDeleteForever } from 'react-icons/md';
import { useSelector } from 'react-redux';

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

  return (
    <AdminPanelsPagesContainer>
      <h2>Personal List</h2>
      <ListWithControlsContainer>
        {listData.map((item, key) => (
          <ListWithControlsItem key={key}>
            <div className="flex gap-2 items-center">
              <IoPerson />
              <Pharagrapf className="truncate min-w-28" size="sm">
                {item.name} {item.surname}
              </Pharagrapf>
            </div>

            <ListWithControlsButtonContainer>
              <MdDeleteForever className="text-red-600 size-6 min-w-8" />
            </ListWithControlsButtonContainer>
          </ListWithControlsItem>
        ))}
      </ListWithControlsContainer>
    </AdminPanelsPagesContainer>
  );
};
