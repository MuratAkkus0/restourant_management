import { AccordionContainersBaseProp } from '@/types/models/organisms/AccordionProps';

const AccordionItemContainer: React.FC<AccordionContainersBaseProp> = ({
  children,
}) => {
  return (
    <>
      <div className="w-full bg-white shadow-lg rounded-lg">{children}</div>
    </>
  );
};

export default AccordionItemContainer;
