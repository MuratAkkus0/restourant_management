import { RootState } from '@/store/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DocumentData } from 'firebase-admin/firestore';
import LinkListItem from '../atoms/LinkListItem';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase/FirebaseConfig';

function LinkList() {
  const userData = useSelector((store: RootState) => store.onAuthChangeState);
  const [listData, setListData] = useState<DocumentData[]>([]);
  const companyId = userData.companyId;
  useEffect(() => {
    // Realtime listener for link list
    const collectionRef = collection(
      db,
      `companies/${companyId}/registerationLinks`
    );
    const listener = onSnapshot(collectionRef, (snapshot) => {
      if (companyId) {
        const registerLinks = snapshot.docs.map((item) => item.data());
        setListData(registerLinks);
      }
    });
    return () => {
      listener();
    };
  }, [companyId]);

  return (
    <div className="w-full flex-1 rounded-lg flex flex-col gap-2 pb-4 md:gap-4 overflow-y-auto">
      {listData.map((item, key) => (
        <LinkListItem key={key} link={item.link} isValid={item.isValid} />
      ))}
    </div>
  );
}

export default LinkList;
