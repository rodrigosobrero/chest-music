import { Outlet, useLocation } from 'react-router-dom';
import { classNames } from 'utils/helpers';

import Nav from 'components/Nav';
import Footer from 'components/Footer';
import Player from 'components/player/Player';

export default function Root() {
  const location = useLocation();
  const allowedPaths = ['/sign-up', '/sign-in', '/notifications', '/shared', '/setup'];
  const connected = allowedPaths.includes(location.pathname);

  return (
    <>
      <div className="flex flex-col h-full">
        <header>
          <Nav />
        </header>
        <main className={
          classNames({
            'p-0': connected,
            'bg-black md:bg-neutral-silver-700 account-selector': location.pathname === '/setup'
          })}>
          <Outlet />
        </main>
        <Footer />
        <Player />
      </div>
    </>
  )
}