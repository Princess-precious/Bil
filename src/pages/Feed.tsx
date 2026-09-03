/**
    * @description      : 
    * @author           : HP
    * @group            : 
    * @created          : 02/09/2026 - 14:38:58
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 02/09/2026
    * - Author          : HP
    * - Modification    : 
**/
import Navbar from '../components/Navbar';
import Hero from '../FeedPage/hero';
import Content from '../FeedPage/content';
import Footer from '../components/footer';

function Feed() {
  return(
    <>
        <Navbar/>
        <Hero/>
        <Content/>
        <Footer/>
    </>
    
  );
}

export default Feed;