import './Main.css';

import Promo from '../Promo/Promo';
import Layout from '../Layout/Layout';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';



function Main({ isLoggedIn, onOpenBurger }) {

  return (
    <>
      <Layout className="header header_main" onOpenBurger={onOpenBurger} isLoggedIn={isLoggedIn} page>
        <main className='content'>
          <Promo />
          <AboutProject />
          <Techs />
          <AboutMe />
          <Portfolio />
        </main>
      </Layout>
    </>
  );
}

export default Main;