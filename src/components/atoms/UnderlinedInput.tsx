import { UnderlinedInputProps } from '@/types/models/UnderlinedInputModels';
import { MouseEventHandler, useRef, useState } from 'react';

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
    hasIcon,
    showIcon = true,
    onClickIcon,
    Icon,
    SecondIcon,
  } = props;
  const [changeIconByClick, setChangeIconByClick] = useState(showIcon);
  const errorMessage = errors[inputId];
  const isTouched = touched[inputId];
  const inputRef = useRef<HTMLInputElement>(null);

  const handleIconChange: MouseEventHandler<SVGAElement> = (e) => {
    if (onClickIcon) {
      onClickIcon(e);
    } else {
      setChangeIconByClick(!changeIconByClick);
    }
    inputRef.current?.focus();
  };
  return (
    <div className="flex flex-col gap-2 flex-shrink-0">
      <label
        className="flex flex-col gap-2 text-base md:text-lg font-normal sm:font-medium "
        htmlFor={inputId}
      >
        {labelText} :
      </label>

      <div className="flex items-center relative justify-between">
        <input
          ref={inputRef}
          value={inputValue}
          onChange={onInputChange}
          onBlur={onInputBlur}
          id={inputId}
          name={inputId}
          type={hasIcon ? (!changeIconByClick ? 'text' : inputType) : inputType}
          className={`w-full border-b py-1 px-2 focus:outline-none transition-[border-color] ${errors && errorMessage && isTouched ? 'border-b-red-600' : 'focus:border-gray-500 '}`}
          placeholder={inputPlaceHolder}
        />
        {hasIcon && (
          <div className="absolute right-2 text-2xl w-8 h-8 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-50 transition-colors duration-300 active:scale-95">
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
        <p className="text-red-600 text-sm font-medium first-letter:uppercase">
          {errorMessage}
        </p>
      ) : (
        ''
      )}
    </div>
  );
}

export default UnderlinedInput;
