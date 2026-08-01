import { MouseEventHandler } from 'react';

export interface ProductCardProps {
  cardImgSrc: string;
  cardTitle: string;
  cardDetails: string;
  cardPrice: number;
  children: React.ReactNode;
  onDelBtnClick: MouseEventHandler<HTMLDivElement>;
}
