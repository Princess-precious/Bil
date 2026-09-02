/**
    * @description      : 
    * @author           : HP
    * @group            : 
    * @created          : 01/09/2026 - 22:36:28
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 01/09/2026
    * - Author          : HP
    * - Modification    : 
**/
import Navbar from '../components/Navbar';
import Section1 from '../HomePageSections/section1';
import Section2 from '../HomePageSections/section2';
import Footer from '../components/footer';

function Home() {
  return(
    <>
      <Navbar/>
      <Section1/>
      <Section2/>
      <Footer/>
    </> 
  );
}

export default Home;