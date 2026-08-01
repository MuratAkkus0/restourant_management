export interface FunctionalActiveDeactiveIconProps {
  isValid: boolean;
}

const FunctionalActiveDeactiveIcon: React.FC<
  FunctionalActiveDeactiveIconProps
> = ({ isValid }) => {
  return (
    <>
      <div className="min-w-16 md:min-w-20 flex-shrink-0 flex items-center gap-1 text-xs md:text-base text-gray-500">
        <span
          className={`w-2 h-2 lg:w-3 animate-pulse lg:h-3 rounded-full ${isValid ? 'bg-green-600' : 'bg-red-600'}`}
        ></span>
        {isValid ? 'Active' : 'Deactive'}
      </div>
    </>
  );
};

export default FunctionalActiveDeactiveIcon;
