import Pharagrapf from '@/components/atoms/Pharagrapf';
import Title from '@/components/atoms/Title';
import StickyDeleteBtn from '@/components/atoms/StickyDeleteBtn';
import ProductCardContainer from '@/components/molecules/ProductCard/ProductCardContainer';
import ProductCardImageContainer from '@/components/molecules/ProductCard/ProductCardImageContainer';
import ProductCardDetailsActionsContainer from '@/components/molecules/ProductCard/ProductCardDetailsActionsContainer';
import ProductCardDetails from '@/components/molecules/ProductCard/ProductCardDetails';
import ProductCardActions from '@/components/molecules/ProductCard/ProductCardActions';
import { ProductCardProps } from '@/types/models/molecules/ProductCardModels';
import { CiImageOn } from 'react-icons/ci';

const ProductCard: React.FC<ProductCardProps> = ({
  cardImgSrc,
  cardTitle,
  cardDetails,
  cardPrice,
  children,
  onDelBtnClick,
}) => {
  return (
    <>
      <ProductCardContainer>
        <StickyDeleteBtn onClick={onDelBtnClick} />
        <ProductCardImageContainer>
          {cardImgSrc ? (
            <img
              className="w-full group-hover:scale-105 transition duration-300"
              src={cardImgSrc}
              alt={cardTitle}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-50">
              <CiImageOn className="size-16" color="#dfdfdf" />
            </div>
          )}
        </ProductCardImageContainer>
        <ProductCardDetailsActionsContainer>
          {/* Title and Details */}
          <ProductCardDetails>
            <Title size="xs" position="left">
              {cardTitle}
            </Title>
            <Pharagrapf size="xs" className="text-gray-400 line-clamp-2">
              {cardDetails}
            </Pharagrapf>
            <Pharagrapf size="xs" className="text-right mt-2">
              {cardPrice} €
            </Pharagrapf>
          </ProductCardDetails>
          <ProductCardActions>{children}</ProductCardActions>
        </ProductCardDetailsActionsContainer>
      </ProductCardContainer>
    </>
  );
};

export default ProductCard;
