import AccordionContainer from './AccordionContainer';
import AccordionItemContainer from './AccordionItemContainer';
import { useState } from 'react';
import AccordionItemTitle from './AccordionItemTitle';
import AccordionItemDetails from './AccordionItemDetails';
import { AccordionProps } from '@/types/models/organisms/AccordionProps';

// data format should be [question:'',answer:'']

const Accordion = ({ data, haveDetails = true }: AccordionProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <>
      <AccordionContainer>
        {data.map((item, index) => (
          <AccordionItemContainer key={index}>
            {
              <AccordionItemTitle
                activeIndex={activeIndex}
                index={index}
                question={item.question}
                toggleAccordion={toggleAccordion}
              />
            }
            {haveDetails && (
              <AccordionItemDetails
                activeIndex={activeIndex}
                answer={item.answer}
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
