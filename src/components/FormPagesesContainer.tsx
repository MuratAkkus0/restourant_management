import { MdKeyboardBackspace } from 'react-icons/md';
import { Link } from 'react-router-dom';
import useWindowSizes from '../customHooks/useWindowSizes';
import SideImage from '../assets/images/Login_page_side.jpg';
import { FC, ReactNode } from 'react';
const FormPagesesContainer: FC<{ children: ReactNode }> = ({ children }) => {
  const [width] = useWindowSizes();
  return (
    <>
      <div className=" w-full h-full flex justify-center bg-gray-50 tracking-wider">
        <div className="h-svh flex-1 flex flex-col items-center justify-between lg:px-2 lg:gap-4 lg:py-10 overflow-y-auto ">
          <div className="max-w-md sm:max-w-lg md:max-w-xl lg:max-w-3xl container lg:border bg-white p-2">
            <Link
              to="/"
              className="inline-flex text-base md:text-lg font-medium gap-1 items-center"
            >
              <MdKeyboardBackspace className="text-xl md:text-2xl" />
              Zurück zur Website
            </Link>
          </div>

          {children}

          <div className="flex justify-between px-4 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-3xl container lg:border bg-white p-2 text-base md:text-lg">
            <span className="font-medium">
              ©{new Date().getFullYear()} Manegio
            </span>
            <Link to="/" className="font-medium">
              Datenschutz
            </Link>
            <Link to="/" className="font-medium">
              Impressum
            </Link>
          </div>
        </div>
        {width >= 1024 ? (
          <div className="hidden lg:block lg:sticky h-svh flex-1 overflow-y-hidden">
            <img
              src={SideImage}
              alt="restaurant image"
              className="min-h-full h-full w-full"
            />
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  );
};

export default FormPagesesContainer;
