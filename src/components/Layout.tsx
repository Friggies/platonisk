import Header from './global/large/header/Header';
import Footer from './global/large/footer/Footer';
import Main from './global/small/main/Main';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Menu from './global/large/menu/Menu';

const Layout = ({ children }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      setMenuOpen(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  return (
    <>
      <Header isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} />
      <Menu isOpen={isMenuOpen} onClose={() => setMenuOpen(false)} />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};

export default Layout;
