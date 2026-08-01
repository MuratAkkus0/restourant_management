import { StickyDeleteBtnProps } from '@/types/models/atoms/StickyDeleteBtnModels';
import { MdDelete } from 'react-icons/md';

const StickyDeleteBtn: React.FC<StickyDeleteBtnProps> = ({
  onClick,
  size = 24,
}) => {
  return (
    <>
      <div
        onClick={onClick}
        className="-translate-y-[120%] group-hover:translate-y-0 transition z-20 absolute top-2 left-1/2 -translate-x-1/2 bg-red-200 bg-opacity-20 shadow-md p-4 rounded-full hover:scale-110"
      >
        <MdDelete className="text-red-600" size={size} />
      </div>
    </>
  );
};

export default StickyDeleteBtn;
