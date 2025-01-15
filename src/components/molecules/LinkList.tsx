import getAllRegisterLinks from '@/services/firebase/getAllRegisterLinks';
import { RootState } from '@/store/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Accordion from '../organisms/Accordion/Accordion';
import { AccordionData } from '@/types/models/organisms/AccordionProps';

function LinkList() {
  const userData = useSelector((store: RootState) => store.onAuthChangeState);
  const [accordionData, setAccordionData] = useState<AccordionData[]>([]);

  useEffect(() => {
    const getData = async () => {
      if (userData.companyId) {
        const data = await getAllRegisterLinks(userData.companyId);
        setAccordionData(
          data.map((item) => {
            return {
              question: item.link,
              answer: item.isValid ? 'active' : 'deactive',
            };
          })
        );
      }
    };
    getData();
  }, [userData]);

  return (
    <div className="bg-white rounded-lg p-2">
      <Accordion data={accordionData} haveDetails={false} />
      {/* <div className="w-full h-96 bg-white rounded-lg overflow-hidden p-2">
        <div className="flex flex-col gap-2">
          {linkList ? (
            linkList.map((item, key) => (
              <div key={key} className="h-8 flex gap-2">
                <div className="w-full border-b text-nowrap overflow-x-auto">
                  <span>{item.link}</span>
                </div>
                <div className="w-12 h-full bg-red-100">asd</div>
              </div>
            ))
          ) : (
            <div className="w-full h-14 border">No Data</div>
          )}
        </div>
      </div> */}
    </div>
  );
}

export default LinkList;
