import { RootState } from '@/store/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DocumentData } from 'firebase-admin/firestore';
import LinkListItem from '../atoms/LinkListItem';
import ListWithControlsContainer from './ListWithControls/ListWithControlsContainer';
import { fetchDocuments } from '@/services/firebase/fetchDocuments';
import { validateAccessKey } from '@/features/authentication/validateRegisterAccessKey';

function LinkList() {
  const userData = useSelector((store: RootState) => store.onAuthChangeState);
  const [listData, setListData] = useState<DocumentData[]>([]);

  useEffect(() => {
    if (!userData.companyId) return;
    const { companyId } = userData;

    let unsub: any = null;
    const listener = async () => {
      try {
        const unsubscribe = await fetchDocuments(
          ['companies', `${companyId}`, 'registerationLinks'],
          setListData,
          { realTime: true }
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
  }, [userData]);

  useEffect(() => {
    const { companyId } = userData;
    if (!companyId) return;
    const checkAccessKeys = async (companyId: string) => {
      listData.forEach(async (item) => {
        await validateAccessKey({
          accessKey: item.key,
          companyId,
        });
      });
    };
    checkAccessKeys(companyId);
    return () => {
      checkAccessKeys(companyId);
    };
  }, [listData, userData]);

  return (
    <ListWithControlsContainer>
      {listData.map((item, key) => (
        <LinkListItem key={key} link={item.link} isValid={item.isValid} />
      ))}
    </ListWithControlsContainer>
  );
}

export default LinkList;
