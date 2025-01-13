import {
  collection,
  getDocs,
  DocumentData,
  deleteDoc,
  doc,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../firebase/FirebaseConfig';
import { useEffect, useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';

function AccessKeyList() {
  const [keyList, setKeyList] = useState<DocumentData[]>([]);

  async function getAccessKeyList() {
    const accessKeyRef = collection(db, 'registerAccessKeys');
    const snapshot = await getDocs(accessKeyRef);
    const keys = snapshot.docs.map((item) => item.data());
    setKeyList(keys);
  }

  async function delAccessKey(e: React.MouseEvent<SVGElement, MouseEvent>) {
    const key = e.currentTarget.dataset.id;
    const accessKeyRef = collection(db, 'registerAccessKeys');
    const q = query(accessKeyRef, where('key', '==', key));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      await deleteDoc(doc(db, 'registerAccessKeys', querySnapshot.docs[0].id));
    }
  }
  useEffect(() => {}, []);

  useEffect(() => {
    getAccessKeyList();
  }, [keyList]);

  return (
    <>
      <table className="w-full h-full table-fixed border-collapse shadow">
        <thead className="border-b">
          <tr>
            <th className="w-2/5 p-2 font-medium border-x">Access Key</th>
            <th className="p-2 font-medium border-x">Created At</th>
            <th className="p-2 font-medium border-x">Exppires At</th>
            <th className="w-16 max-w-16 p-2 font-medium border-x">Is Valid</th>
            <th className="w-16 p-2 font-medium border-x">Controls</th>
          </tr>
        </thead>
        <tbody>
          {keyList &&
            keyList.map((item, index) => (
              <tr key={index}>
                <td className="text-center border p-2 first-letter:uppercase ">
                  {item.key}
                </td>
                <td className="text-center border p-2 first-letter:uppercase ">
                  {new Date(item.createdAt.seconds * 1000).toLocaleString()}
                </td>
                <td className="text-center border p-2 first-letter:uppercase ">
                  {new Date(item.expiresAt.seconds * 1000).toLocaleString()}
                </td>
                <td className="text-center border p-2 first-letter:uppercase ">
                  {item.isValid.toString()}
                </td>
                <td className="flex justify-center border p-2 first-letter:uppercase ">
                  <MdDeleteForever
                    size="1.5rem"
                    cursor="pointer"
                    className=""
                    data-id={item.key}
                    onClick={delAccessKey}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {keyList.length === 0 ? (
        <div className="w-full h-full flex justify-center select-none">
          <span className="max-w-[65%] text-[#0000004e] font-medium text-center">
            You do not have access keys. You can create one by clicking the
            Generate button.
          </span>
        </div>
      ) : (
        ''
      )}
    </>
  );
}

export default AccessKeyList;
