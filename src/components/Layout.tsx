import Header from './header/Header';
import Footer from './footer/Footer';
import Main from './main/Main';
import { useState } from 'react';
import Menu from './menu/Menu';

const Layout = ({ children }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

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
