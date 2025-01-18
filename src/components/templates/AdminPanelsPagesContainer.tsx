import { FC, ReactNode, useEffect, useState } from 'react';
import Logo from '../molecules/Logo';
import { FontSizes, LogoSizes } from '@/types/enums/LogoEnums';
import useWindowSizes from '@/customHooks/useWindowSizes';

const AdminPanelsPagesContainer: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [logoSize, setLogoSize] = useState(LogoSizes.normal);
  const windowSize = useWindowSizes();
  useEffect(() => {
    console.log(windowSize);
    if (windowSize[0] >= 768) {
      setLogoSize(LogoSizes.big);
    }
  }, [windowSize]);
  return (
    <div className="w-full h-full flex flex-col transition-[width] duration-200 p-2 gap-4">
      <div className="flex-shrink-0 w-full h-16 bg-white flex items-center justify-center">
        <Logo LogoSize={logoSize} FontSize={FontSizes.semiRegular} />
      </div>
      {children}
    </div>
  );
};

export default AdminPanelsPagesContainer;
