import { FileUploadInputProps } from '@/types/models/atoms/FileUploadInputModels';
import { useUploadImageMutation } from '@/store/api/uploadsApi';
import { ChangeEvent, useEffect, useState } from 'react';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { CiImageOn } from 'react-icons/ci';
import { toast } from 'sonner';
import { getErrorMessage } from '@/utils/getErrorMessage';

const MAX_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const FileUploadInput: React.FC<FileUploadInputProps> = ({ fieldKey, setFieldValue, previewUrl }) => {
  const [localPreview, setLocalPreview] = useState(previewUrl ?? '');
  const [uploadImage, { isLoading }] = useUploadImageMutation();

  useEffect(() => {
    if (previewUrl) setLocalPreview(previewUrl);
  }, [previewUrl]);

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error('Only JPEG, PNG or WEBP images are allowed.');
      return;
    }
    if (file.size > MAX_SIZE_BYTES) {
      toast.error('Image must be smaller than 5MB.');
      return;
    }

    setLocalPreview(URL.createObjectURL(file));

    try {
      const { url } = await uploadImage(file).unwrap();
      setFieldValue(fieldKey, url);
    } catch (error) {
      toast.error(getErrorMessage(error, 'Image upload failed.'));
      setFieldValue(fieldKey, '');
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      {localPreview ? (
        <img src={localPreview} className="w-32 h-32 object-cover rounded-lg border" alt="Product preview" />
      ) : (
        <div className="w-32 h-32 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
          <CiImageOn size={48} color="#dfdfdf" />
        </div>
      )}
      <label
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center max-w-64 max-h-32 p-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
      >
        <IoCloudUploadOutline size={35} />
        <p className="mt-2 text-sm text-gray-500 cursor-pointer">
          {isLoading ? 'Uploading...' : 'Click to upload an image'}
        </p>
        <input onChange={handleUpload} id="file-upload" type="file" accept="image/*" className="hidden" />
      </label>
    </div>
  );
};

export default FileUploadInput;
