export interface ProductCardContainerProps {
  children: React.ReactNode;
  // size?: 'xs' | 'sm' | 'base' | 'large' | 'xl';
}

// export enum ProductCardSizes {
//   'xs' = 'max-w-56 lg:max-w-64 h-56 sm:h-64',
//   'sm' = 'max-w-64 lg:max-w-72 h-64 sm:h-72',
//   'base' = 'max-w-56 max-h-56 sm:max-w-64 sm:max-h-[21rem] md:max-w-80 md:max-h-96',
//   'large' = 'f',
//   'xl' = 'r',
// }

const ProductCardContainer: React.FC<ProductCardContainerProps> = ({
  children,
  // size = 'base',
}) => {
  return (
    <>
      <div
        className={` group select-text max-w-56 max-h-56 sm:max-w-64 sm:max-h-[21rem] md:max-w-80 md:max-h-96 border-t border-gray-100 flex flex-col justify-center gap-2 shadow-lg rounded-lg overflow-hidden cursor-pointer relative`}
      >
        {children}
      </div>
    </>
  );
};

export default ProductCardContainer;
