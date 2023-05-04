import './Main.css';

import Promo from '../Promo/Promo';
import Layout from '../Layout/Layout';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';



function Main({ isLoggedIn }) {

  return (
    <>
      <Layout className="header header_main" isLoggedIn={false} page>
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