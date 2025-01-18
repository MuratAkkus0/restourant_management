import { RootState } from '@/store/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DocumentData } from 'firebase-admin/firestore';
import LinkListItem from '../atoms/LinkListItem';
import ListWithControlsContainer from './ListWithControls/ListWithControlsContainer';
import { fetchDocuments } from '@/services/firebase/fetchDocuments';

function LinkList() {
  const userData = useSelector((store: RootState) => store.onAuthChangeState);
  const [listData, setListData] = useState<DocumentData[]>([]);
  const [companyId, setCompanyId] = useState(userData.companyId);

  useEffect(() => {
    if (!companyId) return;
    let unsub: any = null;
    const listener = async () => {
      try {
        const unsubscribe = await fetchDocuments(
          ['companies', companyId, 'registerationLinks'],
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
  }, []);

  return (
    <ListWithControlsContainer>
      {listData.map((item, key) => (
        <LinkListItem key={key} link={item.link} isValid={item.isValid} />
      ))}
    </ListWithControlsContainer>
  );
}

export default LinkList;
// Realtime listener for link list
// const collectionRef = collection(
//   db,
//   `companies/${companyId}/registerationLinks`
// );
// const listener = onSnapshot(collectionRef, (snapshot) => {
//   if (companyId) {
//     const registerLinks = snapshot.docs.map((item) => item.data());
//     setListData(registerLinks);
//   }
// });
