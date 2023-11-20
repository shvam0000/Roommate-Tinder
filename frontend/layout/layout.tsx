import { Navbar, Footer } from '@/components/shared';

const Layout = ({ children }: any) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
