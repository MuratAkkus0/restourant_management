import getAllRegisterLinks from '@/services/firebase/getAllRegisterLinks';
import { RootState } from '@/store/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DocumentData } from 'firebase-admin/firestore';
import LinkListItem from '../atoms/LinkListItem';

function LinkList() {
  const userData = useSelector((store: RootState) => store.onAuthChangeState);
  const [listData, setListData] = useState<DocumentData[]>([]);

  useEffect(() => {
    const getData = async () => {
      if (userData.companyId) {
        const data = await getAllRegisterLinks(userData.companyId);
        setListData(data);
      }
    };
    getData();
  }, [userData]);

  return (
    <div className="w-full flex-1 rounded-lg flex flex-col gap-2 pb-4 md:gap-4 overflow-y-auto">
      {listData.map((item, key) => (
        <LinkListItem key={key} link={item.link} isValid={item.isValid} />
      ))}
    </div>
  );
}

export default LinkList;
