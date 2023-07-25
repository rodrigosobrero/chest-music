import { Outlet, useLocation } from 'react-router-dom';
import Nav from 'components/Nav';
import Footer from 'components/Footer';
import Player from 'components/player/Player';

export default function Root() {
  /* replace with session */
  const location = useLocation();
  const connected = location.pathname === '/sign-up' || location.pathname === '/sign-in' ? true : false;

  return (
    <>
      <div className="flex flex-col h-full">
        <header>
          <Nav />
        </header>
        <main className={`${!connected && 'p-[0]'}`}>
          <Outlet />
        </main>
        <Footer />
        <Player />
      </div>
    </>
  )
}