import { AccordionItemDetailsProps } from '@/types/models/organisms/AccordionProps';
const AccordionItemDetails: React.FC<AccordionItemDetailsProps> = ({
  activeIndex,
  index,
  answer,
}) => {
  return (
    <>
      {activeIndex === index && (
        <div className="w-full p-4 pl-0 border-t text-gray-600">{answer}</div>
      )}
    </>
  );
};

export default AccordionItemDetails;
