import Header from './global/large/header/Header';
import Footer from './global/large/footer/Footer';
import Main from './global/small/main/Main';
import { useState } from 'react';
import Menu from './global/large/menu/Menu';

const Layout = ({ children, products }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Header
        isMenuOpen={isMenuOpen}
        setMenuOpen={setMenuOpen}
        products={products}
      />
      <Menu isOpen={isMenuOpen} onClose={() => setMenuOpen(false)} />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};

export default Layout;
