import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      <header className='text-center'>
        <h1 className='text-h1 font-bold p-10'>Kompetenssök</h1>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
      <footer></footer>
    </>
  );
};

export default Layout;
