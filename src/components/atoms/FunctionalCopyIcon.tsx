import { MouseEvent, MouseEventHandler, useState } from 'react';
import { IoIosCopy } from 'react-icons/io';
import FunctionalCopyText from './FunctionalCopyText';

interface FunctionalCopyIconProps {
  iconSize?: number;
  className?: string;
  textToCopy: string;
  onIconClick?: MouseEventHandler<HTMLDivElement>;
}

const FunctionalCopyIcon: React.FC<FunctionalCopyIconProps> = ({
  textToCopy,
  className = '',
  iconSize = 20,
  onIconClick,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const handleIconClick = (e: MouseEvent<HTMLDivElement>) => {
    console.log('clicked');
    const newPosition = { x: e.clientX, y: e.clientY };
    setPosition(newPosition);
  };
  return (
    <>
      <FunctionalCopyText
        text={textToCopy}
        clientX={position.x}
        clientY={position.y}
      />
      <div
        onClick={onIconClick ?? handleIconClick}
        className={`${className} w-9 h-9 bg-white rounded border flex items-center justify-center cursor-pointer`}
      >
        <IoIosCopy onClick={() => console.log('svg')} size={iconSize} />
      </div>
    </>
  );
};

export default FunctionalCopyIcon;
