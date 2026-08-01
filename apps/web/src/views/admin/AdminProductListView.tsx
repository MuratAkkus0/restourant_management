import Button from '@/components/atoms/Button';
import ProductCard from '@/components/molecules/ProductCard/ProductCard';
import TitleCardWithIcon from '@/components/molecules/TitleCardWithIcon';
import { FaThList } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import ProductCardActions from '@/components/molecules/ProductCard/ProductCardActions';
import {
  useDeleteProductMutation,
  useListProductsQuery,
  useSetProductPublishedMutation,
} from '@/store/api/productsApi';
import { getErrorMessage } from '@/utils/getErrorMessage';

const AdminProductListView = () => {
  const { data: products = [], isLoading, isError } = useListProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const [setPublished] = useSetProductPublishedMutation();
  const navigate = useNavigate();

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      await deleteProduct(id).unwrap();
      toast.success('Product deleted.');
    } catch (error) {
      toast.error(getErrorMessage(error, 'Could not delete the product.'));
    }
  };

  const handleTogglePublish = async (id: string, isPublished: boolean) => {
    try {
      await setPublished({ id, isPublished: !isPublished }).unwrap();
      toast.success(!isPublished ? 'Product published to the public menu.' : 'Product unpublished.');
    } catch (error) {
      toast.error(getErrorMessage(error, 'Could not update publish status.'));
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-4 border-black">
      <TitleCardWithIcon text="Product List" Icon={FaThList} iconSize={25} textSize="base" />
      <div className="flex-1 overflow-y-auto flex flex-col gap-4 bg-white rounded-lg p-2 sm:p-3 lg:p-4">
        {isLoading && <p className="text-gray-400 p-4">Loading products...</p>}
        {isError && <p className="text-red-600 p-4">Could not load products. Please try again.</p>}
        {!isLoading && !isError && products.length === 0 && (
          <p className="text-gray-400 p-4">
            No products yet.{' '}
            <button
              className="underline text-blue-500"
              onClick={() => navigate('/admin/product-management/add-update')}
            >
              Add your first product.
            </button>
          </p>
        )}
        {products.map((product) => (
          <ProductCard
            key={product.id}
            cardImgSrc={product.imageUrl}
            cardTitle={product.name}
            cardDetails={product.description ?? 'No description yet.'}
            cardPrice={product.priceCents / 100}
            onDelBtnClick={() => handleDelete(product.id, product.name)}
          >
            <ProductCardActions>
              <Button
                text={product.isPublished ? 'Unpublish' : 'Publish'}
                size="2xs"
                onBtnClick={() => handleTogglePublish(product.id, product.isPublished)}
              />
              <Button
                text="Edit"
                size="base"
                onBtnClick={() =>
                  navigate(`/admin/product-management/add-update?id=${product.id}`)
                }
              />
            </ProductCardActions>
          </ProductCard>
        ))}
      </div>
    </div>
  );
};

export default AdminProductListView;
