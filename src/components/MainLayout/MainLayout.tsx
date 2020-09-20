import React from 'react';
import Head from 'next/head';
import Layout from '../Layout';
import Header from '../Layout/Header';
import SideBar from '../SiderBar';
import Main from '../Layout/Main';

interface MainLayoutProps {
  floatSideBar?: boolean;
}
const MainLayout: React.FC<MainLayoutProps> = ({ children, floatSideBar }) => {
  return (
    <Layout>
      <Header />
      <SideBar floatSideBar={floatSideBar} />
      <Main className="bg-gray-100 flex-grow ">{children}</Main>
    </Layout>
  );
};

export default MainLayout;
