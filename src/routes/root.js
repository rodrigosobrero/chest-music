import { Outlet, useLocation } from 'react-router-dom';
import Nav from 'components/Nav';
import Footer from 'components/Footer';
import Player from 'components/player/Player';

export default function Root() {
  /* replace with session */
  const location = useLocation();
  const connected = location.pathname === '/sign-up' 
                    || location.pathname === '/sign-in' 
                    || location.pathname === '/setup'
                    ? true : false;

  return (
    <>
      <div className="flex flex-col h-full">
        <header>
          <Nav />
        </header>
        <main className={`
          ${connected ? 'p-[0]' : ''}
          ${location.pathname === '/setup' ? 'bg-black md:bg-neutral-silver-700 account-selector' : ''}`}>
          <Outlet />
        </main>
        <Footer />
        <Player />
      </div>
    </>
  )
}