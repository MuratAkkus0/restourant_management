import Logo from './molecules/Logo';
import {
  AccessCardSizeProps,
  AccessKeyCardProps,
} from '../types/models/AccessKeyModels';
import { FontSizes, LogoSizes } from '@/types/enums/LogoEnums';
function AccessKeyCard(props: AccessKeyCardProps) {
  const {
    inputVal,
    setInputVal,
    placeholder = '',
    isInputReadOnly = false,
    btnOnClick,
    descText,
    cardTitle,
    btnText,
    cardLogoSize = AccessCardSizeProps.regular,
    cardFontSize = AccessCardSizeProps.regular,
  } = props;

  return (
    <div className="max-w-md sm:max-w-lg md:max-w-xl lg:max-w-3xl container py-10 px-6 border flex flex-col items-center justify-center lg:rounded-lg shadow-sm gap-5 p-2 bg-white">
      <div className="w-full flex flex-col items-center gap-4">
        <Logo
          LogoSize={LogoSizes[cardLogoSize]}
          FontSize={FontSizes[cardFontSize]}
        />
        <h2 className="border-b font-medium text-xl sm:text-2xl xl:text-3xl">
          {cardTitle}
        </h2>
      </div>
      <div className="w-full flex flex-col items-center gap-5 md:gap-4">
        <p className="text-md text-black leading-5 lg:leading-normal">
          <span className="text-red-600 font-medium">*</span> {descText}
        </p>
        <input
          spellCheck="false"
          readOnly={isInputReadOnly}
          value={inputVal}
          onChange={setInputVal ? (e) => setInputVal(e.target.value) : () => { }}
          placeholder={placeholder}
          type="text"
          className="w-full h-8 border-b outline-none focus:border-b-black focus:border-gray-300 p-2 text-md sm:text-base lg:text-xl placeholder:text-md"
        />
        <button
          onClick={btnOnClick}
          className="px-10 py-1 rounded-lg bg-gradient-to-r from-orange-500 to-red-600 text-white text-base lg:text-xl hover:scale-[1.02] active:scale-[.98]"
        >
          {btnText}
        </button>
      </div>
    </div>
  );
}

export default AccessKeyCard;
