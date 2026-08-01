import { ContainerBaseProps } from '@/types/models/general/ContainerBaseProp';

const ProductCardActions: React.FC<ContainerBaseProps> = ({ children }) => {
  return (
    <>
      <div className="flex gap-2 justify-end items-center">{children} </div>
    </>
  );
};

export default ProductCardActions;
