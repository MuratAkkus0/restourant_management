import getAllRegisterLinks from '@/services/firebase/getAllRegisterLinks';
import { RootState } from '@/store/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DocumentData } from 'firebase-admin/firestore';

function LinkList() {
  const userData = useSelector((store: RootState) => store.onAuthChangeState);
  const [listData, setListData] = useState<DocumentData[]>([]);

  useEffect(() => {
    console.log(listData);
    const getData = async () => {
      if (userData.companyId) {
        const data = await getAllRegisterLinks(userData.companyId);
        setListData(data);
      }
    };
    getData();
  }, [userData]);

  return <div className="w-full flex-1 rounded-lg"></div>;
}

export default LinkList;
