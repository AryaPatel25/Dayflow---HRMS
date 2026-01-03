import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children, userName }) => {
  return (
    <div className="flex min-h-screen bg-[#0f172a]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header userName={userName} />
        <main className="flex-1 p-6 bg-[#0f172a]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

