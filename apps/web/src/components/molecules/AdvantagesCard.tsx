import { AdvantagesCardProps } from '@/types/models/molecules/AdvantagesCardModels';
import Pharagrapf from '../atoms/Pharagrapf';

const AdvantagesCard: React.FC<AdvantagesCardProps> = ({
  title,
  desc,
  Icon,
  iconSize = 35,
  iconColor = '#000000',
  className = '',
}) => {
  return (
    <div
      className={`${className} flex gap-4 items-center justify-start bg-white text-black p-6 rounded-lg shadow-lg hover:shadow-xl`}
    >
      {Icon && (
        <div className="">
          <Icon size={iconSize} color={iconColor} />
        </div>
      )}
      <div className="">
        <h3 className="text-xl font-semibold mb-3 text-transparent bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text">
          {title}
        </h3>
        {desc && <Pharagrapf size="sm">{desc}</Pharagrapf>}
      </div>
    </div>
  );
};

export default AdvantagesCard;
