import { AccordionItemTitleProps } from '@/types/models/organisms/AccordionProps';
import { FaMinus, FaPlus } from 'react-icons/fa6';

const AccordionItemTitle: React.FC<AccordionItemTitleProps> = ({
  toggleAccordion,
  activeIndex,
  index,
  question,
}) => {
  return (
    <>
      <button
        onClick={() => toggleAccordion(index)}
        className="w-full text-left lg:text-base xl:text-lg flex justify-between items-center p-4 font-medium"
      >
        {question}
        <span>valid</span>
        <span>{activeIndex === index ? <FaMinus /> : <FaPlus />}</span>
      </button>
    </>
  );
};

export default AccordionItemTitle;
