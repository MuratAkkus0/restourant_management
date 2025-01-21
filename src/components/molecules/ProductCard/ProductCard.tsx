import Pharagrapf from '@/components/atoms/Pharagrapf';
import Title from '@/components/atoms/Title';
import StickyDeleteBtn from '@/components/atoms/StickyDeleteBtn';
import ProductCardContainer from '@/components/molecules/ProductCard/ProductCardContainer';
import ProductCardImageContainer from '@/components/molecules/ProductCard/ProductCardImageContainer';
import ProductCardDetailsActionsContainer from '@/components/molecules/ProductCard/ProductCardDetailsActionsContainer';
import ProductCardDetails from '@/components/molecules/ProductCard/ProductCardDetails';
import ProductCardActions from '@/components/molecules/ProductCard/ProductCardActions';
import { ProductCardProps } from '@/types/models/molecules/ProductCardModels';

const ProductCard: React.FC<ProductCardProps> = ({
  cardImgSrc,
  cardTitle,
  cardDetails,
  children,
  onDelBtnClick,
}) => {
  return (
    <>
      <ProductCardContainer>
        <StickyDeleteBtn onClick={onDelBtnClick} />
        <ProductCardImageContainer>
          <img
            className="w-full group-hover:scale-105 transition duration-300"
            src={cardImgSrc}
            alt="test"
          />
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
          </ProductCardDetails>
          <ProductCardActions>{children}</ProductCardActions>
        </ProductCardDetailsActionsContainer>
      </ProductCardContainer>
    </>
  );
};

export default ProductCard;
