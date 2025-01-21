import { ContainerBaseProps } from '@/types/models/general/ContainerBaseProp';
import React from 'react';

const ProductCardContainer: React.FC<ContainerBaseProps> = ({ children }) => {
  return (
    <>
      <div className="group w-full max-w-80 h-64 sm:h-80  flex flex-col justify-center gap-2 shadow-lg rounded-lg overflow-hidden cursor-pointer relative">
        {children}
      </div>
    </>
  );
};

export default ProductCardContainer;
