import { ListWithControlsButtonContainer } from '@/components/molecules/ListWithControls/ListWithControlsButtonContainer';
import { ListWithControlsContainer } from '@/components/molecules/ListWithControls/ListWithControlsContainer';
import { ListWithControlsItem } from '@/components/molecules/ListWithControls/ListWithControlsItem';
import AdminPanelsPagesContainer from '@/components/templates/AdminPanelsPagesContainer';
import { CiEdit, CiMenuKebab } from 'react-icons/ci';
import { MdDeleteForever } from 'react-icons/md';

export const AdminPersonalListView = () => {
  return (
    <AdminPanelsPagesContainer>
      <div className="w-full h-full flex flex-col items-center">
        <h2>Personal List</h2>
        <ListWithControlsContainer>
          <ListWithControlsItem text="Deneme Personal Adi Bu Demek">
            <ListWithControlsButtonContainer>
              <MdDeleteForever className="text-red-600 size-6" />
              <CiEdit className="text-red-600 size-6 stroke-[.5]" />
              <CiMenuKebab className="size-6 stroke-1" />
            </ListWithControlsButtonContainer>
          </ListWithControlsItem>
        </ListWithControlsContainer>
      </div>
    </AdminPanelsPagesContainer>
  );
};
