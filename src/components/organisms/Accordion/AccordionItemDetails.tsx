import { AccordionItemDetailsProps } from '@/types/models/organisms/AccordionProps';

const AccordionItemDetails: React.FC<AccordionItemDetailsProps> = ({
  activeIndex,
  index,
  answer,
}) => {
  return (
    <>
      {activeIndex === index && (
        <div className="p-4 xl:text-base border-t border-neutralLight">
          {answer}
        </div>
      )}
    </>
  );
};

export default AccordionItemDetails;
