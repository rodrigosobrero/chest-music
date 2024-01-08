import 'react-toastify/dist/ReactToastify.css';

import { Outlet } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';

import Nav from 'components/Nav';
import Footer from 'components/Footer';
import Player from 'components/player/Player';

export default function Root() {
  return (
    <>
      {/* <ToastContainer /> */}
      <div className='flex flex-col h-full'>
        <header>
          <Nav />
        </header>
        <main>
          <Outlet />
        </main>
        <Footer />
        <Player />
      </div>
    </>
  )
}