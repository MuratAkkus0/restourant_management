import { AccordionContainersBaseProp } from '@/types/models/organisms/AccordionProps';
const AccordionItemContainer: React.FC<AccordionContainersBaseProp> = ({
  children,
}) => {
  return (
    <div className="w-full bg-white shadow-lg first-of-type:border-t first-of-type:border-t-gray-100 rounded-lg px-4">
      {children}
    </div>
  );
};

export default AccordionItemContainer;
