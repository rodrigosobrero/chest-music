import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { classNames } from 'utils/helpers';

import Nav from 'components/Nav';
import Footer from 'components/Footer';
import Player from 'components/player/Player';

export default function Root() {
  const { player } = useSelector(state => state);

  return (
    <>
      <Helmet>
        <script>
          {`
            (function(h,o,t,j,a,r){ 
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)}; 
              h._hjSettings={hjid:3868461,hjsv:6}; 
              a=o.getElementsByTagName('head')[0]; 
              r=o.createElement('script');
              r.async=1; 
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv; 
              a.appendChild(r); 
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `}
        </script>
      </Helmet>
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