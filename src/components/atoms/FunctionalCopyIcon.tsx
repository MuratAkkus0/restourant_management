import { MouseEventHandler, useState } from 'react';
import { IoIosCopy } from 'react-icons/io';

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
  const [show, setShow] = useState(false);
  const handleIconClick = () => {
    navigator.clipboard.writeText(textToCopy);
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 500);
  };
  return (
    <>
      <div
        onClick={onIconClick ?? handleIconClick}
        className={`${className} w-9 h-9 bg-white rounded border flex items-center justify-center cursor-pointer relative`}
      >
        {show && (
          <span className="absolute top-full animate-bounce">Copied!</span>
        )}
        <IoIosCopy size={iconSize} />
      </div>
    </>
  );
};

export default FunctionalCopyIcon;
