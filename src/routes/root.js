import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { classNames } from 'utils/helpers';

import Nav from 'components/Nav';
import Footer from 'components/Footer';
import Player from 'components/player/Player';

export default function Root() {
  const { player } = useSelector(state => state);

  return (
    <>
      <div className={classNames({
        'flex flex-col h-full': true,
        'overflow-hidden': player.opened
      })}>
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