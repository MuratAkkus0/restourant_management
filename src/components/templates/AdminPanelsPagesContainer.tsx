import { FC, ReactNode, useEffect, useState } from 'react';
import Logo from '../molecules/Logo';
import { LogoSizes } from '@/types/enums/LogoEnums';
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
    <div className="w-full h-full transition-[width] duration-200 p-2">
      <div className="w-full h-16 bg-white mb-4 flex items-center justify-center">
        <Logo LogoSize={logoSize} />
      </div>
      {children}
    </div>
  );
};

export default AdminPanelsPagesContainer;
