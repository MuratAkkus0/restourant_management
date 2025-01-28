import Button from '@/components/atoms/Button';
import ProductCard from '@/components/molecules/ProductCard/ProductCard';
import TitleCardWithIcon from '@/components/molecules/TitleCardWithIcon';
import { FaThList } from 'react-icons/fa';
import testImg from '@/assets/images/Login_page_side.jpg';
import ProductCardActions from '@/components/molecules/ProductCard/ProductCardActions';

export interface AdminProductListViewProps {
  a: string;
}

const AdminProductListView = () => {
  return (
    <>
      <div className="w-full h-full flex flex-col gap-4 border-black">
        <TitleCardWithIcon
          text="Product List"
          Icon={FaThList}
          iconSize={25}
          textSize="base"
        />
        <div className="flex-1 overflow-y-auto flex flex-col gap-4 bg-white rounded-lg p-2 sm:p-3 lg:p-4">
          {/* card */}
          <ProductCard
            cardImgSrc={testImg}
            cardTitle="Test Title"
            cardDetails=" This is a test description. This is a test description. This is a test
          description. This is a test description. This is a test description."
            onDelBtnClick={() => {
              console.log('del btn clicked.');
            }}
          >
            <ProductCardActions>
              <Button text="Edit" size="base" />
            </ProductCardActions>
          </ProductCard>
        </div>
      </div>
    </>
  );
};

export default AdminProductListView;
