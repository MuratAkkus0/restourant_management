import Button from '../atoms/Button';
import FunctionalCopyIcon from '../atoms/FunctionalCopyIcon';
import { GenerateLinkCardProps } from '@/types/models/molecules/GenerateLinkCardModels';

const GenerateLinkCard: React.FC<GenerateLinkCardProps> = ({
  cardTitle = 'Create Registeration Link',
  link,
  onClickCreateLink,
}) => {
  return (
    <>
      {' '}
      <div className="w-full flex flex-col items-center gap-2 bg-white rounded-lg p-4">
        <h3 className="w-full text-center font-medium text-xl md:text-2xl">
          {cardTitle}
        </h3>
        <div className="w-full md:w-3/4 h-12 p-2 flex gap-2">
          <a className="w-full h-9 leading-8 px-2 block border border-gray-400 rounded text-nowrap overflow-x-auto">
            {link}
          </a>
          <FunctionalCopyIcon textToCopy={link} />
        </div>
        <div className="flex justify-center">
          <Button
            type="button"
            onBtnClick={onClickCreateLink}
            text="Create Link"
          />
        </div>
      </div>
    </>
  );
};

export default GenerateLinkCard;
