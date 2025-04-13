import Header from './header/Header';
import Navigation from './navigation/Navigation';
import Footer from './footer/Footer';
import Main from './main/Main';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadAnimationsState } from '../store/animationSlice';

const Layout = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAnimationsState());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Navigation />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};

export default Layout;
