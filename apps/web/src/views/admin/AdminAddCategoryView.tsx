import Button from '@/components/atoms/Button';
import UnderlinedInput from '@/components/atoms/UnderlinedInput';
import TitleCardWithIcon from '@/components/molecules/TitleCardWithIcon';
import { useState } from 'react';
import { FaEdit, FaThList } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { toast } from 'sonner';
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useListCategoriesQuery,
  useUpdateCategoryMutation,
} from '@/store/api/categoriesApi';
import { getErrorMessage } from '@/utils/getErrorMessage';

export const AdminAddCategoryView = () => {
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const { data: categories = [], isLoading, isError } = useListCategoriesQuery();
  const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const startEdit = (id: string, currentName: string) => {
    setEditingId(id);
    setName(currentName);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setName('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;

    try {
      if (editingId) {
        await updateCategory({ id: editingId, body: { name: trimmed } }).unwrap();
        toast.success('Category updated.');
      } else {
        await createCategory({ name: trimmed }).unwrap();
        toast.success('Category created.');
      }
      cancelEdit();
    } catch (error) {
      toast.error(getErrorMessage(error, 'Could not save the category.'));
    }
  };

  const handleDelete = async (id: string, categoryName: string) => {
    if (!window.confirm(`Delete "${categoryName}"? Products in it will become uncategorized.`)) return;
    try {
      await deleteCategory(id).unwrap();
      toast.success('Category deleted.');
    } catch (error) {
      toast.error(getErrorMessage(error, 'Could not delete the category.'));
    }
  };

  return (
    <div className="flex-[1] flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <TitleCardWithIcon
          text={editingId ? 'Edit Category' : 'Add New Category'}
          Icon={FaThList}
          iconSize={25}
          textSize="base"
        />
        <div className="flex justify-center items-center bg-white w-full rounded-lg shadow-md border-t p-4">
          <form onSubmit={handleSubmit} className="w-full h-full flex flex-col items-center gap-4">
            <UnderlinedInput
              labelText="Category Name"
              inputValue={name}
              onInputChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              inputId="categoryName"
              inputPlaceHolder="Category Name"
            />
            <div className="flex gap-2">
              {editingId && (
                <Button text="Cancel" type="button" className="w-fit" onBtnClick={cancelEdit} />
              )}
              <Button
                text={editingId ? 'Save Changes' : 'Add Category'}
                type="submit"
                className="w-fit"
                isSubmitInProgress={isCreating || isUpdating}
              />
            </div>
          </form>
        </div>
      </div>

      <div className="flex-[1] flex flex-col gap-4">
        <TitleCardWithIcon text="Category List" Icon={FaThList} iconSize={25} textSize="base" />
        <div className="flex-[1] flex flex-col justify-center items-center bg-white w-full rounded-lg shadow-md border-t p-4">
          {isLoading && <p className="text-gray-400 py-6">Loading categories...</p>}
          {isError && <p className="text-red-600 py-6">Could not load categories. Please try again.</p>}
          {!isLoading && !isError && categories.length === 0 && (
            <p className="text-gray-400 py-6">No categories yet - add your first one above.</p>
          )}
          {!isLoading && categories.length > 0 && (
            <div className="w-full h-full">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex justify-between items-center gap-2 sm:gap-4 px-4 w-full h-14 border-t border-t-gray-100 shadow-md"
                >
                  <div>
                    {category.name}{' '}
                    <span className="text-xs text-gray-400">
                      ({category._count.products} product{category._count.products === 1 ? '' : 's'})
                    </span>
                  </div>
                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      aria-label={`Delete ${category.name}`}
                      onClick={() => handleDelete(category.id, category.name)}
                    >
                      <MdDeleteForever className="size-[1.37rem] md:size-[1.65rem]" />
                    </button>
                    <button
                      type="button"
                      aria-label={`Edit ${category.name}`}
                      onClick={() => startEdit(category.id, category.name)}
                    >
                      <FaEdit className="size-5 md:size-6" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
