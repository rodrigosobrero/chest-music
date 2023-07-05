import { Outlet } from 'react-router-dom';
import Nav from 'components/Nav';
import Footer from 'components/Footer';
import Player from 'components/player/Player';
// import Player from 'components/Player';

export default function Root() {
  return (
    <>
      <div className="flex flex-col h-full">
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