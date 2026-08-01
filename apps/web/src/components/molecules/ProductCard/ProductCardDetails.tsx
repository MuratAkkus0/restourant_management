import { ContainerBaseProps } from '@/types/models/general/ContainerBaseProp';

const ProductCardDetails: React.FC<ContainerBaseProps> = ({ children }) => {
  return (
    <>
      <div className="flex flex-col">{children}</div>
    </>
  );
};

export default ProductCardDetails;
