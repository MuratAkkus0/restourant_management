import Button from '@/components/atoms/Button';
import Pharagrapf from '@/components/atoms/Pharagrapf';
import Title from '@/components/atoms/Title';
import ProductCardActions from '@/components/molecules/ProductCard/ProductCardActions';
import ProductCardContainer from '@/components/molecules/ProductCard/ProductCardContainer';
import ProductCardDetails from '@/components/molecules/ProductCard/ProductCardDetails';
import ProductCardDetailsActionsContainer from '@/components/molecules/ProductCard/ProductCardDetailsActionsContainer';
import ProductCardImageContainer from '@/components/molecules/ProductCard/ProductCardImageContainer';
import UnderlinedInput from '@/components/atoms/UnderlinedInput';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import SearchableDropdown from '@/components/molecules/SearchableDropdown/SearchableDropdown';
import { MdEuro } from 'react-icons/md';
import FileUploadInput from '@/components/atoms/FileUploadInput';
import { CiImageOn } from 'react-icons/ci';
import SideBySideInputContainer from '@/components/templates/SideBySideInputContainer';
import { SideBySideInputContainerSlotWidths } from '@/types/enums/SideBySideInputContainerEnums';
import { useListCategoriesQuery } from '@/store/api/categoriesApi';
import { useCreateProductMutation, useGetProductQuery, useUpdateProductMutation } from '@/store/api/productsApi';
import { getErrorMessage } from '@/utils/getErrorMessage';

const AdminAddProductView = () => {
  const [searchParams] = useSearchParams();
  const editingId = searchParams.get('id');
  const navigate = useNavigate();

  const { data: categories = [] } = useListCategoriesQuery();
  const { data: existingProduct } = useGetProductQuery(editingId ?? '', { skip: !editingId });
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      priceEuros: '',
      categoryId: '' as string,
      imageUrl: '',
    },
    onSubmit: async (values) => {
      const priceCents = Math.round(Number(values.priceEuros.replace(',', '.')) * 100);
      if (!values.name.trim()) {
        toast.error('Please enter a product name.');
        return;
      }
      if (!Number.isFinite(priceCents) || priceCents < 0) {
        toast.error('Please enter a valid price.');
        return;
      }

      const sharedFields = {
        name: values.name.trim(),
        description: values.description.trim() || undefined,
        priceCents,
        categoryId: values.categoryId || null,
        imageUrl: values.imageUrl || null,
      };

      try {
        if (editingId) {
          // Publish state is only ever changed from the product list's
          // dedicated toggle, never as a side effect of editing details.
          await updateProduct({ id: editingId, body: sharedFields }).unwrap();
          toast.success('Product updated.');
        } else {
          await createProduct({ ...sharedFields, isPublished: false }).unwrap();
          toast.success('Product created.');
        }
        navigate('/admin/product-management/product-list');
      } catch (error) {
        toast.error(getErrorMessage(error, 'Could not save the product.'));
      }
    },
  });

  const { values, handleBlur, handleChange, handleSubmit, touched, errors, isSubmitting, setFieldValue } =
    formik;

  useEffect(() => {
    if (!existingProduct) return;
    setFieldValue('name', existingProduct.name);
    setFieldValue('description', existingProduct.description ?? '');
    setFieldValue('priceEuros', (existingProduct.priceCents / 100).toFixed(2));
    setFieldValue('categoryId', existingProduct.categoryId ?? '');
    setFieldValue('imageUrl', existingProduct.imageUrl ?? '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [existingProduct]);

  const categoryOptions = categories.map((c) => ({ name: c.name, code: c.id }));
  const currentCategoryName = categories.find((c) => c.id === values.categoryId)?.name ?? 'Uncategorized';

  return (
    <>
      <div className="h-full flex justify-center overflow-y-auto gap-4 sm:p-4">
        <div className="h-[60%] lg:h-[64%] xl:h-[67%] flex flex-col gap-4 max-md:items-center md:flex-row md:flex-wrap md:justify-center md:items-start">
          <form
            onSubmit={handleSubmit}
            className="h-full md:flex-[1] shrink-0 md:max-w-[95%] bg-white max-md:shrink-0 border-t border-gray-100 p-4 rounded-lg shadow-lg flex flex-col items-center justify-center overflow-y-auto gap-4"
          >
            <FileUploadInput
              fieldKey="imageUrl"
              setFieldValue={setFieldValue}
              previewUrl={values.imageUrl}
            />
            <SearchableDropdown
              defaultValue={currentCategoryName}
              onDataSelect={(categoryId) => setFieldValue('categoryId', categoryId)}
              dataList={categoryOptions}
            />
            <SideBySideInputContainer
              left={
                <UnderlinedInput
                  inputId="name"
                  labelText="Title"
                  inputValue={values.name}
                  onInputChange={handleChange}
                  onInputBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                />
              }
              right={
                <UnderlinedInput
                  labelText="Price"
                  inputValue={values.priceEuros}
                  onInputChange={handleChange}
                  onInputBlur={handleBlur}
                  inputId={'priceEuros'}
                  inputType="text"
                  inputPlaceHolder="0.00"
                  hasIcon={true}
                  iconPosition="right"
                  Icon={MdEuro}
                  iconSize={20}
                  errors={errors}
                  touched={touched}
                />
              }
              slotType={SideBySideInputContainerSlotWidths.smallRightSlot}
              isByMdScreensInputsGrid={true}
            />

            <UnderlinedInput
              inputId="description"
              labelText="Description"
              inputValue={values.description}
              onInputChange={handleChange}
              onInputBlur={handleBlur}
              isMultiline={true}
              errors={errors}
              touched={touched}
            />
            <Button text={editingId ? 'Save Changes' : 'Add Product'} type="submit" isSubmitInProgress={isSubmitting} />
          </form>

          <div className="h-fit md:h-full w-full md:flex-[1] shrink-0 bg-white shadow-lg rounded-lg flex flex-col items-center justify-center md:justify-center p-4">
            <Title className="p-2 underline underline-offset-4" size="xs" position="left">
              Preview :
            </Title>
            <ProductCardContainer>
              <ProductCardImageContainer>
                {values.imageUrl.length ? (
                  <img className="min-w-full max-w-full " src={values.imageUrl} />
                ) : (
                  <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
                    <CiImageOn className="min-w-full max-w-full size-40" color="#dfdfdf" />
                  </div>
                )}
              </ProductCardImageContainer>
              <ProductCardDetailsActionsContainer>
                <ProductCardDetails>
                  <Title position="left" size="xs" className="line-clamp-1">
                    {values.name.length ? values.name : 'Example Product Name'}
                  </Title>
                  <Pharagrapf size="2xs" className="line-clamp-2">
                    {values.description.length ? values.description : 'Example Product Description...'}
                  </Pharagrapf>
                  <Pharagrapf size="xs" className="text-right mt-2">
                    {values.priceEuros.length ? values.priceEuros : '0.00'} €
                  </Pharagrapf>
                </ProductCardDetails>
                <ProductCardActions>
                  <Button size="2xs" text="Edit" />
                </ProductCardActions>
              </ProductCardDetailsActionsContainer>
            </ProductCardContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminAddProductView;
