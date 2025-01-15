export interface AccordionBaseProps {
  haveDetails?: boolean;
  isTitleHaveAdditionalChild?: boolean;
  isDataHaveAnotherFormat?: boolean;
}

export type AccordionAnotherDataFormatProps<T> =
  | {
      isDataHaveAnotherFormat: true;
      haveDetails?: true;
      data: T[];
      titleDataObjKey: keyof T;
      detailsDataObjKey: keyof T;
    }
  | {
      isDataHaveAnotherFormat: true;
      haveDetails: false;
      data: T[];
      titleDataObjKey: keyof T;
      detailsDataObjKey: never;
    };

export type AccordionAdditionalTitleNodeProps =
  | {
      isTitleHaveAdditionalChild: true;
      additionalChildNode: React.ReactNode[];
    }
  | {
      isTitleHaveAdditionalChild?: false;
      additionalChildNode?: never;
    };
export type AccordionStandartProps = {
  isDataHaveAnotherFormat?: false;
  data: AccordionData[];
  titleDataObjKey?: never;
  detailsDataObjKey?: never;
};

export type AccordionProps<T> =
  | (AccordionBaseProps &
      AccordionAnotherDataFormatProps<T> &
      AccordionAdditionalTitleNodeProps)
  | (AccordionBaseProps &
      AccordionStandartProps &
      AccordionAdditionalTitleNodeProps);

export interface AccordionData {
  question: string;
  answer: string;
}

export interface AccordionItemDetailsProps {
  activeIndex: number | null;
  index: number;
  answer: string | T[keyof T];
}

export interface AccordionItemTitleProps {
  toggleAccordion: CallableFunction;
  activeIndex: number | null;
  index: number;
  question: string | T[keyof T];
  additionalChildNode: React.ReactNode;
}
export interface AccordionContainersBaseProp {
  children: React.ReactNode;
}
