//AccordionItemTitleBase.tsx Props
export interface AccordionItemTitleProps {
  toggleAccordion: CallableFunction;
  activeIndex: number | null;
  index: number;
  question: string;
}

// Acordion.tsx Props
export interface AccordionProps {
  data: AccordionData[];
  haveDetails?: boolean;
}

export interface AccordionData {
  question: string;
  answer: string;
}
// End of Acordion.tsx Prompts

//AcAccordionItemDetails.tsx Prompts
export interface AccordionItemDetailsProps {
  activeIndex: number | null;
  index: number;
  answer: string | T[keyof T];
}

export interface AccordionContainersBaseProp {
  children: React.ReactNode;
}
