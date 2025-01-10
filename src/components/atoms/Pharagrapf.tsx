import { PharagrapfTextSizes } from '@/types/enums/atoms/PharagrapfEnums';
import { PharagrapfProps } from '@/types/models/atoms/Pharagrapf';

const Pharagrapf: React.FC<PharagrapfProps> = ({
  children,
  color,
  className = '',
  colorClassName = 'text-black',
  size = 'base',
}) => {
  const customStyle = color ? { color: color } : {};
  return (
    <p
      style={customStyle}
      className={`${PharagrapfTextSizes[size]} ${colorClassName} ${className}`}
    >
      {children}
    </p>
  );
};

export default Pharagrapf;
