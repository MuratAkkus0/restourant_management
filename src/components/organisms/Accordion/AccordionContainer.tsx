import { AccordionContainersBaseProp } from '@/types/models/organisms/AccordionProps';

const AccordionContainer: React.FC<AccordionContainersBaseProp> = ({
  children,
}) => {
  return (
    <>
      <div className="w-full space-y-4">{children}</div>
    </>
  );
};

export default AccordionContainer;
