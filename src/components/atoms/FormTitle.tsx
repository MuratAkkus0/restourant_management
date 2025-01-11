import { FormTitleProps } from '@/types/models/atoms/FormTitleProps';

function FormTitle({ titleText }: FormTitleProps) {
  return (
    <h3 className="mx-auto mb-10 text-2xl font-medium font-Phenomena sm:text-3xl">
      {titleText}
    </h3>
  );
}

export default FormTitle;
