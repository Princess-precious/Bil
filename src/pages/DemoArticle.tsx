/**
    * @description      : 
    * @author           : HP
    * @group            : 
    * @created          : 03/09/2026 - 11:55:18
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 03/09/2026
    * - Author          : HP
    * - Modification    : 
**/
import Navbar from "../components/Navbar"

import DemoImage from "../DemoArtSections/DemoImage";

function DemoArticle(){
  return(
    <div>
      <Navbar/>
      <section className="flex items-center justify-center mt-[80px] py-8 px-14 md:px-90">
        <div className="flex flex-col flex-wrap items-center text-center   gap-4">
          <p className=" text-xs text-[#b35d52] ">
            Architecture & Design
          </p>
          <h1 className="font-bold text-4xl">
            The Quiet Resurgence of Brutalism in Modern Interfaces
        </h1>
        <p className="text-sm ">
          How raw structural logic is reclaiming digital spaces from the era of flat design and generic minimalism.
        </p>
        <div></div>
      </div>
      
    </section>
      <DemoImage/>
    </div>
  
  );
}

export default DemoArticle;