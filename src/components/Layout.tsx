import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      <header className='text-center pb-8 relative'>
        <h1 className='text-h1 font-bold pt-8 pb-3'>Yrken och kompetenser</h1>
        <p className='mt-[-20px] mb-4'>Din väg från utbildningen till jobbet!</p>
        <div className="mb-4 absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-transparent to-primary"></div>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
      <footer></footer>
    </>
  );
};

export default Layout;
