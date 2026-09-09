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
import Carousel from '../components/Carousel';
import Footer from '../components/footer';

function Home() {
  return(
    <>
      <Navbar className="bg-transparent text-white! border-b border-[#373737]"/>
    
      <Carousel/>
      
      
      <div className="absolute bottom-0 left-0 w-full z-20">
        <Footer className="border-b border-[#373737] bg-transparent text-white"/>
      </div>
       
    </> 
  );
}

export default Home;