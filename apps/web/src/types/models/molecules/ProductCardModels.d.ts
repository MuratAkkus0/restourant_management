import { MouseEventHandler } from 'react';

export interface ProductCardProps {
  cardImgSrc?: string | null;
  cardTitle: string;
  cardDetails: string;
  cardPrice: number;
  children: React.ReactNode;
  onDelBtnClick: MouseEventHandler<HTMLDivElement>;
}
