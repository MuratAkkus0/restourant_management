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
import { MdEuro } from 'react-icons/md';
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
      productTitle: '',
      productDesc: '',
      productPrice: 0.0,
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
      <div className="h-full flex justify-center overflow-y-auto gap-4 sm:p-4">
        <div className="h-[60%] lg:h-[64%] xl:h-[67%] flex flex-col gap-4 max-md:items-center md:flex-row md:flex-wrap md:justify-center md:items-start">
          <form
            action="#"
            className="h-full md:flex-[1] shrink-0 md:max-w-[95%] bg-white max-md:shrink-0 border-t border-gray-100 p-4 rounded-lg shadow-lg flex flex-col items-center justify-center overflow-y-auto gap-4"
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
                  inputId="productTitle"
                  labelText="Title"
                  inputValue={values.productTitle}
                  onInputChange={handleChange}
                  onInputBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                />
              }
              right={
                <UnderlinedInput
                  labelText="Price"
                  inputValue={values.productPrice.toString()}
                  onInputChange={handleChange}
                  onInputBlur={handleBlur}
                  inputId={'productPrice'}
                  inputType="number"
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
              inputId="productDesc"
              labelText="Description"
              inputValue={values.productDesc}
              onInputChange={handleChange}
              onInputBlur={handleBlur}
              isMultiline={true}
              errors={errors}
              touched={touched}
            />
            <Button text="Add Product" type="submit" />
          </form>

          <div className="h-fit md:h-full w-full md:flex-[1] shrink-0 bg-white shadow-lg rounded-lg flex flex-col items-center justify-center md:justify-center p-4">
            <Title
              className="p-2 underline underline-offset-4"
              size="xs"
              position="left"
            >
              Preview :
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
                    <CiImageOn
                      className="min-w-full max-w-full size-40"
                      color="#dfdfdf"
                    />
                  </div>
                )}
              </ProductCardImageContainer>
              <ProductCardDetailsActionsContainer>
                <ProductCardDetails>
                  <Title position="left" size="xs" className="line-clamp-1">
                    {values.productTitle.length
                      ? values.productTitle
                      : 'Example Product Name'}
                  </Title>
                  <Pharagrapf size="2xs" className="line-clamp-2">
                    {values.productDesc.length
                      ? values.productDesc
                      : 'Example Product Description...'}
                  </Pharagrapf>
                  <Pharagrapf size="xs" className="text-right mt-2">
                    {values.productPrice > 0 ? values.productPrice : '0.00'} €
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
