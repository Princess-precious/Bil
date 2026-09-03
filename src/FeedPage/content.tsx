/**
    * @description      : 
    * @author           : HP
    * @group            : 
    * @created          : 02/09/2026 - 15:31:04
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 02/09/2026
    * - Author          : HP
    * - Modification    : 
**/
import architectureimg from '../images/architectureimg.jpg';
import technologyimg from '../images/technologyimg.jpg';


function Content() {
  return(
    <section className="flex flex-2 flex-col md:flex-row h-auto py-8 px-14  bg-[#fbf9f8] justify-between ">
      {/* FIRST FRACTION */}
      <div className="flex flex-2 flex-col flex-wrap gap-6 items-center md:items-start border-b border-[#dbdad9] pb-5 md:border-b-0 md:border-r md:border-[#dbdad9]  md:pr-4">
        
        {/* first section of the first fraction */}
        <div className="flex flex-col md:flex-row gap-4 mt-10">
          <div className="flex flex-col gap-4 order-2 md:order-1">
            <div className="flex flex-row gap-2 ">
              <p className="text-[10px] font-bold text-[#1a1a1a] bg-[#f5f3f3] p-1">ARCHITECTURE</p>
              <p className="font-bold text-[#1a1a1a]text-xs">.</p>
              <p className="text-xs text-[#1a1a1a]p-1">By Elena Rostova</p>
            </div>
            <h1 className="text-xl md:text-3xl font-bold text-[#1a1a1a]">
              The Brutalist Revival: Concrete Poetics in the Modern City
            </h1>
            <p className="text-xs text-[#1a1a1a]">
              An exploration into why a new generation of architects is returning to the imposing, raw aesthetics of mid-century brutalism, finding beauty in utility and stark geometry.
            </p>
            
            <p className="text-xs text-[#1a1a1a]"> Oct 12</p>
            
            
          </div>
          <div className="order-1 md:order-2 mb-4">
             <img src={architectureimg} alt="Loading..." className="" /> 
          </div>
        </div>

        {/* second section of the first fraction */}
        <div className="flex flex-col md:flex-row gap-4 mt-10">
          <div className="flex flex-col gap-4 order-2 md:order-1">
            <div className="flex flex-row gap-2 ">
              <p className="text-[10px] font-bold text-[#1a1a1a] bg-[#f5f3f3] p-1">TeECHNOLOGY</p>
              <p className="font-bold text-[#1a1a1a]text-xs">.</p>
              <p className="text-xs text-[#1a1a1a]p-1">By Marcus Throne</p>
            </div>
            <h1 className="text-xl md:text-3xl font-bold text-[#1a1a1a]">
              Silicon Sentience: The Philosophy of Code
            </h1>
            <p className="text-xs text-[#1a1a1a]">
              As machine learning models grow increasingly complex, technologists and ethicists grapple with the fuzzy boundaries between algorithmic processing and genuine cognition.
            </p>
            
            <p className="text-xs text-[#1a1a1a]"> Oct 10</p>
            
            
          </div>
          <div className="order-1 md:order-2 mb-4">
             <img src={technologyimg} alt="Loading..." className="" /> 
          </div>
        </div>

        {/* third section of the first fraction */}
        <div className="flex flex-col md:flex-row gap-4 mt-10">
          <div className="flex flex-col gap-4 order-2 md:order-1">
            <div className="flex flex-row gap-2 ">
              <p className="text-[10px] font-bold text-[#1a1a1a] bg-[#f5f3f3] p-1">CULTURE</p>
              <p className="font-bold text-[#1a1a1a]text-xs">.</p>
              <p className="text-xs text-[#1a1a1a]p-1">By  Sarah Jenkins </p>
            </div>
            <h1 className="text-xl md:text-3xl font-bold text-[#1a1a1a]">
              The Death of the Flâneur in the Digital Age
            </h1>
            <p className="text-xs text-[#1a1a1a]">
              How constant connectivity and algorithmic routing have eroded the art of aimless wandering in the modern metropolis.
            </p>
            
            <p className="text-xs text-[#1a1a1a]"> Oct 8</p>
            
            
          </div>
          <div className="order-1 md:order-2 mb-4">
             <img src={technologyimg} alt="Loading..." className="" /> 
          </div>
        </div>
      </div>

      {/* SECOND FRACTION(FOR YOU) */}
      <div className="flex flex-1 p-5 flex-col items-center text-center md:text-start md:items-start md:text-center">
        <p className="text-[#b35d52] text-xs mb-5">FOR YOU</p>

        <div className="flex flex-col gap-2 mb-5">
          <h1 className="font-bold text-sm">The Aesthetics of Silence in Cinema</h1>
          <p className=" text-xs">Film</p>
        </div>

        <div className="flex flex-col gap-2 mb-5">
          <h1 className="font-bold text-sm">Sustainable Haute Couture: A Paradox?</h1>
          <p className=" text-xs">Fashion</p>
        </div>

        <div className="flex flex-col gap-2 mb-5">
          <h1 className="font-bold text-sm">Gastronomy as Geopolitics</h1>
          <p className=" text-xs">Culture</p>
        </div>

        <h1 className="text-xs mt-5 mb-5">EXPLORE TOPICS</h1>
        <div className="flex flex-row gap-2">
          <button className="p-1 border border-[#dbdad9] text-xs hover:bg-black hover:text-white active:opacity-80">Design</button>
          <button className="p-1 border border-[#dbdad9] text-xs hover:bg-black hover:text-white active:opacity-80">Economics</button>
          <button className="p-1 border border-[#dbdad9] text-xs hover:bg-black hover:text-white active:opacity-80">Philosophy</button>
          <button className="p-1 border border-[#dbdad9] text-xs hover:bg-black hover:text-white active:opacity-80">Click me</button>
        </div>
      </div>
    </section>
    
  );
}
export default Content;