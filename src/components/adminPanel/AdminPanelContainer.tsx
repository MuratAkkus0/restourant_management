import { FC, ReactNode } from 'react';

const AdminPanelContainer: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="w-full h-full transition-[width] duration-200">
      {children}
    </div>
  );
};

export default AdminPanelContainer;
