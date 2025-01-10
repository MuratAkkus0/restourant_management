import { SideBySideInputContainerSlotWidths } from '@/types/enums/SideBySideInputContainerEnums';
import { SideBySideInputContainerProps } from '@/types/models/SideBySideInputContainerModels';

function SideBySideInputContainer({
  right,
  left,
  slotType = SideBySideInputContainerSlotWidths.equalSlots,
  isByMdScreensInputsGrid = false,
}: SideBySideInputContainerProps) {
  return (
    <>
      {isByMdScreensInputsGrid ? (
        <div className="grid grid-rows-1 grid-cols-12 gap-2 relative">
          <div
            style={{ gridColumnEnd: slotType }}
            className={`max-md:col-start-1 md:col-span-12 flex flex-col gap-2 flex-shrink-0`}
          >
            {left}
          </div>
          <div
            style={{ gridColumnStart: slotType }}
            className={`max-md:col-end-13 md:col-span-12 flex flex-col gap-2 flex-shrink-0`}
          >
            {right}
          </div>
        </div>
      ) : (
        <div className="max-md:grid md:flex md:flex-col md:justify-center grid-rows-1 grid-cols-12 gap-2 md:grid-rows-2 md:grid-cols-1 md:gap-2 relative">
          <div
            style={{ gridColumnEnd: slotType }}
            className={`max-md:col-start-1 md:col-span-12 flex flex-col gap-2 flex-shrink-0`}
          >
            {left}
          </div>
          <div
            style={{ gridColumnStart: slotType }}
            className={`max-md:col-end-13 md:col-span-12 flex flex-col gap-2 flex-shrink-0`}
          >
            {right}
          </div>
        </div>
      )}
    </>
  );
}

export default SideBySideInputContainer;
