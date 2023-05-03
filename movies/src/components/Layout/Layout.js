import Footer from "../Footer/Footer";
import Header from "../Header/Header";

function Layout({ page, onOpenBurger, className, children, isLoggedIn }) {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} className={className} onOpenBurger={onOpenBurger} />
      {children}
      <Footer page={page} />
    </>
  );
}

export default Layout;