import Title from '../atoms/Title';
import { IconType } from 'react-icons';

export interface TitleCardWithIconProps {
  text: string;
  Icon: IconType;
  iconSize?: number;
  className?: string;
  textSize?: 'base' | '2xs' | 'xs' | 'sm' | 'large' | 'xl' | '2xl';
  textClassName?: string;
}

const TitleCardWithIcon: React.FC<TitleCardWithIconProps> = ({
  text,
  Icon,
  iconSize = 25,
  className = '',
  textSize = 'base',
  textClassName = '',
}) => {
  return (
    <>
      <div
        className={`${className} flex p-4 bg-white rounded-lg items-center justify-center gap-2`}
      >
        <Icon size={iconSize} />
        <Title size={textSize} className={textClassName}>
          {text}
        </Title>
      </div>
    </>
  );
};

export default TitleCardWithIcon;
