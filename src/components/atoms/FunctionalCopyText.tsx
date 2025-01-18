import { useEffect, useState } from 'react';

export interface FunctionalCopyTextProps {
  text: string;
  clientX: number;
  clientY: number;
}

export const FunctionalCopyText: React.FC<FunctionalCopyTextProps> = ({
  text,
  clientX,
  clientY,
}) => {
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const copyOnClick = () => {
      const newPosition = { x: clientX, y: clientY };
      setPosition(newPosition);
      navigator.clipboard.writeText(text);
      console.log(position);
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 500);
    };
    return copyOnClick();
  }, [clientX, clientY]);
  return (
    <>
      {show && (
        <div
          style={{ top: position.y + 35, left: position.x - 30 }}
          className={`z-20 w-52 h-28 absolute -translate-x-1/2 text-gray-700 animate-bounce`}
        >
          Copied!
        </div>
      )}
    </>
  );
};
