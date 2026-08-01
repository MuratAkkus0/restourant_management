import { ContainerBaseProps } from '@/types/models/general/ContainerBaseProp';

const ProductCardDetailsActionsContainer: React.FC<ContainerBaseProps> = ({
  children,
}) => {
  return (
    <>
      <div className="flex-[2] flex flex-col gap-2 sm:gap-3 md:gap-4 p-2">
        {children}
      </div>
    </>
  );
};

export default ProductCardDetailsActionsContainer;
