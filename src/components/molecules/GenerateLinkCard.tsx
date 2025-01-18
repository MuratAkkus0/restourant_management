import Button from '../atoms/Button';
import FunctionalCopyIcon from '../atoms/FunctionalCopyIcon';
import { GenerateLinkCardProps } from '@/types/models/molecules/GenerateLinkCardModels';
import Title from '../atoms/Title';

const GenerateLinkCard: React.FC<GenerateLinkCardProps> = ({
  cardTitle = 'Create Registeration Link',
  link,
  onClickCreateLink,
}) => {
  return (
    <>
      <div className="flex-shrink-0 flex flex-col items-center gap-2 bg-white rounded-lg p-4">
        <Title size="base" className="md:text-2xl">
          {cardTitle}
        </Title>

        <div className="w-full md:w-3/4 h-12 p-2 flex gap-2">
          <input
            disabled
            value={link}
            className="w-full h-9 leading-8 px-2 block border border-gray-400 rounded text-nowrap overflow-x-auto"
          ></input>
          <FunctionalCopyIcon textToCopy={link} />
        </div>
        <div className="flex justify-center select-none">
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
