import { ContainerBaseProps } from '@/types/models/general/ContainerBaseProp';

const ProductCardImageContainer: React.FC<ContainerBaseProps> = ({
  children,
}) => {
  return (
    <>
      <div className="flex-[8] flex-shrink-0 w-full h-full flex gap-2 justify-center items-center overflow-hidden">
        {children}
      </div>
    </>
  );
};

export default ProductCardImageContainer;
