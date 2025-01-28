import { FileUploadInputProps } from '@/types/models/atoms/FileUploadInputModels';
import { ChangeEvent, useEffect, useState } from 'react';
import { IoCloudUploadOutline } from 'react-icons/io5';
import Resizer from 'react-image-file-resizer';

const FileUploadInput: React.FC<FileUploadInputProps> = ({
  fieldKey,
  setFieldValue,
}) => {
  const [base64Image, setBase64Image] = useState('');
  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    const resizeFile = (file: Blob) =>
      new Promise((resolve) => {
        Resizer.imageFileResizer(
          file,
          1024,
          1024,
          'WEBP',
          80,
          0,
          (uri) => {
            resolve(uri);
          },
          'base64',
          150
        );
      });

    const base64Data = await resizeFile(file);
    setBase64Image(base64Data as string);
  };
  useEffect(() => {
    setFieldValue(fieldKey, base64Image);
  }, [base64Image]);
  return (
    <>
      <div className="flex items-center justify-center w-full cursor-pointer">
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center max-w-64 max-h-32 p-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        >
          <IoCloudUploadOutline size={35} />
          <p className="mt-2 text-sm text-gray-500 cursor-pointer">
            Click for upload image
          </p>
          <input
            onChange={handleUpload}
            id="file-upload"
            type="file"
            className="hidden"
          />
        </label>
      </div>

      {/* <img src={`data:image/jpeg;base64,${base64Image}`} className="mt-5" /> */}
    </>
  );
};

export default FileUploadInput;
