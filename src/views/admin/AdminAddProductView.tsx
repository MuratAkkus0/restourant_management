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
import SearchableDropdown from '@/components/molecules/SearchableDropdown/SearchableDropdown';
import { MdOutlinePriceChange } from 'react-icons/md';
import FileUploadInput from '@/components/atoms/FileUploadInput';
import { CiImageOn } from 'react-icons/ci';
import SideBySideInputContainer from '@/components/templates/SideBySideInputContainer';
import { SideBySideInputContainerSlotWidths } from '@/types/enums/SideBySideInputContainerEnums';

const AdminAddProductView = () => {
  const onSubmit = () => {
    console.log('product card submitted.');
  };

  const formik = useFormik({
    initialValues: {
      productName: '',
      productDesc: '',
      productPrice: '',
      productImg: '',
    },
    onSubmit: onSubmit,
  });

  const {
    values,
    handleBlur,
    handleChange,
    // handleSubmit,
    touched,
    errors,
    // isSubmitting,
    // setSubmitting,
    setFieldValue,
  } = formik;

  return (
    <>
      <div className="h-full flex flex-col sm:flex-row sm:justify-center overflow-y-auto gap-4 p-4 bg-white rounded-lg">
        <form
          action="#"
          className="max-sm:shrink-0 border-t border-gray-100 p-4 rounded-lg shadow-lg flex flex-col overflow-y-auto gap-4"
        >
          <FileUploadInput
            fieldKey="productImg"
            setFieldValue={setFieldValue}
          />
          <SearchableDropdown
            defaultValue="Select a category..."
            onDataSelect={() => {}}
            dataList={[
              { name: 'Fast Food', code: 'FF' },
              { name: 'Kebap', code: 'KBP' },
              { name: 'Soup', code: 'SP' },
            ]}
          />
          <SideBySideInputContainer
            left={
              <UnderlinedInput
                inputId="productName"
                labelText="Product Name"
                inputValue={values.productName}
                onInputChange={handleChange}
                onInputBlur={handleBlur}
                errors={errors}
                touched={touched}
              />
            }
            right={
              <UnderlinedInput
                labelText="Price"
                inputValue={values.productPrice}
                onInputChange={handleChange}
                onInputBlur={handleBlur}
                inputId={'productPrice'}
                inputType="number"
                hasIcon={true}
                iconPosition="left"
                Icon={MdOutlinePriceChange}
                errors={errors}
                touched={touched}
              />
            }
            slotType={SideBySideInputContainerSlotWidths.smallRightSlot}
            isByMdScreensInputsGrid={true}
          />

          <UnderlinedInput
            inputId="productDesc"
            labelText="Product Description"
            inputValue={values.productDesc}
            onInputChange={handleChange}
            onInputBlur={handleBlur}
            isMultiline={true}
            errors={errors}
            touched={touched}
          />
          <Button text="Add Product" type="submit" />
        </form>

        <div className="flex flex-col items-center justify-center sm:p-3 md:p-4 lg:p-7 xl:p-10">
          <Title className="p-2" size="xs" position="left">
            Product Preview :
          </Title>
          <ProductCardContainer>
            <ProductCardImageContainer>
              {values.productImg.length ? (
                <img
                  className="min-w-full max-w-full "
                  src={values.productImg}
                />
              ) : (
                <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
                  <CiImageOn className="size-40" color="#dfdfdf" />
                </div>
              )}
            </ProductCardImageContainer>
            <ProductCardDetailsActionsContainer>
              <ProductCardDetails>
                <Title position="left" size="xs" className="line-clamp-1">
                  {values.productName.length
                    ? values.productName
                    : 'Example Product Name'}
                </Title>
                <Pharagrapf size="2xs" className="line-clamp-2">
                  {values.productDesc.length
                    ? values.productDesc
                    : 'Example Product Description...'}
                </Pharagrapf>
              </ProductCardDetails>
              <ProductCardActions>
                <Button size="2xs" text="Edit" />
              </ProductCardActions>
            </ProductCardDetailsActionsContainer>
          </ProductCardContainer>
        </div>
      </div>
    </>
  );
};

export default AdminAddProductView;
