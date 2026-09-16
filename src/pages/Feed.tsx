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
import { useStories } from "../lib/hooks/useStories";
import Navbar from '../components/Navbar';
import Content from '../components/Feed/content';
import Footer from '../components/footer';

function Feed() {
  const { data, isLoading, isError, error } = useStories();
  console.log("DATA:", data);
  console.log("LOADING:", isLoading);
  console.log("ERROR:", isError);
  console.log("ERROR DETAILS:", error);
  console.log("Stories:", data);
  return(
    <>
        <Navbar/>
        
        <Content stories={data?? [] }/>
        <Footer/>
    </>
    
  );
}

export default Feed;