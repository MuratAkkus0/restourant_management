import { FormInputUnderlinedProps } from '@/types/models/ComponentPromptModels';

function FormInputUnderlined(props: FormInputUnderlinedProps) {
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
    setShowIcon = () => {},
    Icon,
    SecondIcon,
  } = props;
  const errorMessage = errors[inputId];
  const isTouched = touched[inputId];
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
          value={inputValue}
          onChange={onInputChange}
          onBlur={onInputBlur}
          id={inputId}
          name={inputId}
          type={showIcon ? (showIcon ? 'text' : inputType) : inputType}
          className={`w-full border-b py-1 px-2 placeholder:text-base focus:outline-none transition-[border-color] ${errors && errorMessage && isTouched ? 'border-b-red-600' : 'focus:border-gray-500 '}`}
          placeholder={inputPlaceHolder}
        />
        {hasIcon && (
          <div className="absolute right-2 text-2xl w-8 h-8 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-50 transition-colors duration-300 active:scale-95">
            {!showIcon ? (
              Icon && <Icon size={26} onClick={() => setShowIcon(true)} />
            ) : SecondIcon ? (
              <SecondIcon size={26} onClick={() => setShowIcon(false)} />
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

export default FormInputUnderlined;
