import { AccordionContainersBaseProp } from '@/types/models/organisms/AccordionProps';
const AccordionContainer: React.FC<AccordionContainersBaseProp> = ({
  children,
}) => {
  return (
    <div className="w-full h-full flex flex-col gap-4 p-4 border">
      {children}
    </div>
  );
};

export default AccordionContainer;
