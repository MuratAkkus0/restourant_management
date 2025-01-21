import { MouseEventHandler } from 'react';

export interface ProductCardProps {
  cardImgSrc: string;
  cardTitle: string;
  cardDetails: string;
  children: React.ReactNode;
  onDelBtnClick: MouseEventHandler<HTMLDivElement>;
}
