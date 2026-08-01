import { UserCircleCardWithNameProps } from '@/types/models/molecules/UserCircleCardWithNameModels';
import Pharagrapf from '../atoms/Pharagrapf';

const UserCircleCardWithName: React.FC<UserCircleCardWithNameProps> = ({
  fullName,
  imgUrl = '',
  greetingText = 'Welcome!',
}) => {
  const nameArr = fullName.split(' ');
  return (
    <>
      <div className="w-full h-1/12 flex items-center gap-2 px-4 select-non">
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
        <div className="text-white lg:text-lg xl:text-xl leading-5">
          <Pharagrapf
            colorClassName="text-white"
            className="font-Poppins font-normal"
          >
            {fullName}
          </Pharagrapf>
          <Pharagrapf
            size="2xs"
            colorClassName="text-gray-400"
            className="font-Poppins font-extralight"
          >
            {greetingText}
          </Pharagrapf>
        </div>
      </div>
    </>
  );
};

export default UserCircleCardWithName;
