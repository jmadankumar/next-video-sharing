import React from 'react';

interface LayoutProps {}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <div className="w-full h-full flex">{children}</div>;
};

export default Layout;
