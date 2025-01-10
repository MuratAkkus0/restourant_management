import { UserCircleCardWithNameProps } from '@/types/models/ComponentPromptModels';

const UserCircleCardWithName: React.FC<UserCircleCardWithNameProps> = ({
  fullName,
  imgUrl = '',
  greetingText = 'Welcome!',
}) => {
  const nameArr = fullName.split(' ');
  return (
    <>
      <div className="w-full h-1/12 flex items-center gap-2 px-4">
        <div className="h-full">
          {imgUrl.length > 0 ? (
            <div className=" ">
              <img src={imgUrl} className="w-14 h-14 rounded-full" />
            </div>
          ) : (
            <div className="w-14 h-14 flex justify-center items-center bg-green-400 text-2xl font-Poppins font-semibold rounded-full">
              {`${nameArr[0].charAt(0) + nameArr[nameArr.length - 1].charAt(0)}`}
            </div>
          )}
        </div>
        <div className="text-white text-base sm:text-base lg:text-lg xl:text-xl leading-5">
          <p className="font-Poppins font-normal">{fullName}</p>
          <p className="font-Poppins text-xs font-extralight text-gray-400">
            {greetingText}
          </p>
        </div>
      </div>
    </>
  );
};

export default UserCircleCardWithName;
