import { MdDeleteForever } from 'react-icons/md';
import FunctionalCopyIcon from './FunctionalCopyIcon';
import FunctionalActiveDeactiveIcon from './FunctionalActiveDeactiveIcon';

export interface LinkListItemProps {
  link: string;
  isValid: boolean;
}
const LinkListItem: React.FC<LinkListItemProps> = ({ link, isValid }) => {
  console.log(isValid);
  return (
    <>
      <div className="w-full p-4 bg-white shadow-lg rounded-lg flex justify-evenly items-center gap-4">
        <p className="sm:max-w-sm md:max-w-60 lg:max-w-lg max-w-[58rem] text-sm md:text-base text-gray-500 hover:text-black truncate">
          {link}
        </p>
        <FunctionalActiveDeactiveIcon isValid={isValid} />
        <div className="flex-shrink-0 flex items-center text-right cursor-pointer">
          <MdDeleteForever
            className="text-red-600 hover:scale-110 transition"
            size={25}
          />
          <FunctionalCopyIcon
            textToCopy={link}
            className="text-red-600 border-none"
          />
        </div>
      </div>
    </>
  );
};

export default LinkListItem;
