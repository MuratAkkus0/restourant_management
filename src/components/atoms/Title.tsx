import { TitleTextSizes } from '@/types/enums/atoms/TitleEnums';
import { TitleProps } from '@/types/models/atoms/Title';
import React from 'react';

const Title: React.FC<TitleProps> = ({
  children,
  className,
  size = 'base',
}) => {
  return (
    <>
      <h1 className={`${className} ${TitleTextSizes[size]} `}>{children}</h1>
    </>
  );
};

export default Title;
