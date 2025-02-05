import Button from '@/components/atoms/Button';
import UnderlinedInput from '@/components/atoms/UnderlinedInput';
import TitleCardWithIcon from '@/components/molecules/TitleCardWithIcon';
import { useState } from 'react';
import { FaEdit, FaThList } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';

export const AdminAddCategoryView = () => {
  const [ctgName, setCtgName] = useState('');
  return (
    <>
      <div className="flex-[1] flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <TitleCardWithIcon
            text="Add New Category"
            Icon={FaThList}
            iconSize={25}
            textSize="base"
          />
          <div className="flex justify-center items-center bg-white w-full rounded-lg shadow-md border-t p-4">
            <form className="w-full h-full flex flex-col items-center gap-4">
              <UnderlinedInput
                labelText="Category Name"
                inputValue={ctgName}
                onInputChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCtgName(e.target.value)
                }
                inputId="categoryName"
                inputPlaceHolder="Category Name"
              />
              <Button text="Add Category" className="w-fit" />
            </form>
          </div>
        </div>

        <div className="flex-[1] flex flex-col gap-4">
          <TitleCardWithIcon
            text="Category List"
            Icon={FaThList}
            iconSize={25}
            textSize="base"
          />
          <div className="flex-[1] flex justify-center items-center bg-white w-full rounded-lg shadow-md border-t p-4">
            <div className="w-full h-full">
              <div className="flex justify-between items-center gap-2 sm:gap-4 px-4 w-full h-14 border-t border-t-gray-100 shadow-md">
                <div>Icecekler</div>
                <div className="flex justify-end gap-2">
                  <div>
                    <MdDeleteForever className="size-[1.37rem] md:size-[1.65rem]" />
                  </div>
                  <div>
                    <FaEdit className="size-5 md:size-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
