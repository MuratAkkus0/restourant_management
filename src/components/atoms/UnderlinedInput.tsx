import { UnderlinedInputProps } from '@/types/models/atoms/UnderlinedInputModels';
import { MouseEventHandler, useRef, useState } from 'react';
import Pharagrapf from './Pharagrapf';

function UnderlinedInput(props: UnderlinedInputProps) {
  const {
    labelText,
    inputValue = '',
    onInputChange = () => {},
    onInputBlur = () => {},
    inputId,
    inputType = 'text',
    inputPlaceHolder = '',
    errors = {},
    touched = {},
    hasIcon = false,
    showIcon = true,
    onClickIcon,
    Icon,
    iconPosition = 'right',
    SecondIcon,
    className = 'w-full',
    isMultiline = false,
  } = props;
  const [changeIconByClick, setChangeIconByClick] = useState(showIcon);
  const errorMessage = errors[inputId];
  const isTouched = touched[inputId];
  const inputRef = useRef<any>(null);

  const handleIconChange: MouseEventHandler<SVGAElement> = (e) => {
    if (onClickIcon) {
      onClickIcon(e);
    } else {
      setChangeIconByClick(!changeIconByClick);
    }
    inputRef.current?.focus();
  };
  return (
    <div className={`${className} flex flex-col gap-2 flex-shrink-0`}>
      <label
        className="flex flex-col gap-2 text-sm md:text-sm  font-normal md:font-medium "
        htmlFor={inputId}
      >
        {labelText} :
      </label>

      <div className="flex items-center relative justify-between">
        {!isMultiline ? (
          <input
            ref={inputRef}
            value={inputValue}
            onChange={onInputChange}
            onBlur={onInputBlur}
            id={inputId}
            name={inputId}
            type={
              hasIcon ? (!changeIconByClick ? 'text' : inputType) : inputType
            }
            className={`w-full border-b py-1 focus:outline-none transition-[border-color] text-base placeholder:text-base placeholder:text-gray-300 placeholder:font-light ${errors && errorMessage && isTouched ? 'border-b-red-600' : 'focus:border-gray-500 '} ${hasIcon ? (iconPosition == 'left' ? 'pl-10' : 'pr-10') : ''}`}
            placeholder={inputPlaceHolder}
          />
        ) : (
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={onInputChange}
            onBlur={onInputBlur}
            id={inputId}
            name={inputId}
            className={`w-full border-b py-1 resize-none focus:outline-none transition-[border-color] text-base placeholder:text-base placeholder:text-gray-300 placeholder:font-light ${errors && errorMessage && isTouched ? 'border-b-red-600' : 'focus:border-gray-500 '} ${hasIcon ? (iconPosition == 'left' ? 'pl-10' : 'pr-10') : ''}`}
            placeholder={inputPlaceHolder}
          ></textarea>
        )}

        {hasIcon && (
          <div
            style={{
              [iconPosition]: '2px',
            }}
            className={`absolute text-2xl w-8 h-8 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-50 transition-colors duration-300 active:scale-95`}
          >
            {changeIconByClick ? (
              Icon && <Icon size={26} onClick={handleIconChange} />
            ) : SecondIcon ? (
              <SecondIcon size={26} onClick={handleIconChange} />
            ) : (
              Icon && <Icon size={26} />
            )}
          </div>
        )}
      </div>

      {errorMessage && isTouched ? (
        <>
          <Pharagrapf
            size="2xs"
            colorClassName="text-red-600"
            className="font-medium first-letter:uppercase"
          >
            {errorMessage}
          </Pharagrapf>
        </>
      ) : (
        ''
      )}
    </div>
  );
}

export default UnderlinedInput;
