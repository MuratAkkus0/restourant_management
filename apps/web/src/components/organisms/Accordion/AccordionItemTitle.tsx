import { AccordionItemTitleProps } from '@/types/models/organisms/AccordionProps';
import { FaMinus, FaPlus } from 'react-icons/fa6';
const AccordionItemTitle: React.FC<AccordionItemTitleProps> = ({
  toggleAccordion,
  activeIndex,
  index,
  question,
}) => {
  return (
    <button
      onClick={() => toggleAccordion(index)}
      className="w-full flex justify-between items-center py-4 text-base md:text-lg"
    >
      <div className="">{question}</div>
      <div>{activeIndex === index ? <FaMinus /> : <FaPlus />}</div>
    </button>
  );
};

export default AccordionItemTitle;
