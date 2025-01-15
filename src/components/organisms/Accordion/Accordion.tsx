import AccordionContainer from './AccordionContainer';
import AccordionItemContainer from './AccordionItemContainer';
import { useState } from 'react';
import AccordionItemTitle from './AccordionItemTitle';
import AccordionItemDetails from './AccordionItemDetails';
import {
  AccordionData,
  AccordionProps,
} from '@/types/models/organisms/AccordionProps';

// data format should be [question:'',answer:'']
const Accordion = <T,>({
  data,
  haveDetails = true,
  isDataHaveAnotherFormat = false,
  isTitleHaveAdditionalChild = false,
  titleDataObjKey,
  detailsDataObjKey,
  additionalChildNode,
}: AccordionProps<T>) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <>
      <AccordionContainer>
        {data.map((item, index) => (
          <AccordionItemContainer key={index}>
            <AccordionItemTitle
              activeIndex={activeIndex}
              index={index}
              question={
                isDataHaveAnotherFormat
                  ? (item as T)[titleDataObjKey as keyof T]
                  : (item as AccordionData).question
              }
              toggleAccordion={toggleAccordion}
              additionalChildNode={
                isTitleHaveAdditionalChild ? additionalChildNode : <></>
              }
            />
            {haveDetails && (
              <AccordionItemDetails
                activeIndex={activeIndex}
                answer={
                  isDataHaveAnotherFormat
                    ? (item as T)[detailsDataObjKey as keyof T]
                    : (item as AccordionData).answer
                }
                index={index}
              />
            )}
          </AccordionItemContainer>
        ))}
      </AccordionContainer>
    </>
  );
};

export default Accordion;
