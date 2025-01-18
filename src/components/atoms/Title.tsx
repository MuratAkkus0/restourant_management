import { TitlePositions, TitleTextSizes } from '@/types/enums/atoms/TitleEnums';
import { TitleProps } from '@/types/models/atoms/Title';
import React from 'react';

const Title: React.FC<TitleProps> = ({
  children,
  className,
  size = 'base',
  position = 'center',
}) => {
  return (
    <>
      <h1
        className={`${className} ${TitleTextSizes[size]} ${TitlePositions[position]} `}
      >
        {children}
      </h1>
    </>
  );
};

export default Title;
