/**
    * @description      : 
    * @author           : HP
    * @group            : 
    * @created          : 02/09/2026 - 02:13:15
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 02/09/2026
    * - Author          : HP
    * - Modification    : 
**/
import homeimg2 from "../images/homeimg2.jpg";
import homeimg3 from "../images/homeimg3.jpg";

function Section2() {
  return(
    <section className="bg-[#fbf9f8] h-auto  px-14  py-12 flex flex-col border-b border-[#dbdad9]">
      <div className="flex flex-col items-center md:flex-row justify-between p-2 gap-2">
        <h1 className="text-2xl font-bold text-[#1a1a1a]">Trending Perspectives</h1>
        <button className="flex items-center text-xs p-2 hover:opacity-80 active:opacity-80">
          View ALL
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </div>

      <div className="flex flex-col md:flex-row justify-between md:gap-10 flex-wrap">
        <div className=" flex flex-col flex-2 rounded-md items-center text-center md:text-start md:items-start my-8 p-4">
        
          <img src={homeimg2} alt="Loading..." className="w-full h-full rounded-md object-cover shadow-2xl mb-6"></img>
          <p className="text-[#b35d52] text-xs mb-2">
            CULTURE
          </p>
          <h1 className="text-xl font-bold text-[#1a1a1a] mb-2">
            The Return to Tactility
          </h1>
          <p className="text-sm text-[#1a1a1a]">
            Why analog experiences are commanding a premium in an increasingly digitized reality, shifting the paradigm of modern luxury.
          </p>

        </div>

        <div className="flex flex-col flex-1 items-center md:items-start md:my-8">
          <div className="flex flex-col items-center md:items-start border-b border-[#dbdad9] p-4">
            <img src={homeimg3} alt="Loading..." className="w-full h-full rounded-md object-cover shadow-2xl mb-6"></img>
            <p className="text-[#b35d52] text-xs mb-2">
              CURATION
            </p>
            <h1 className="text-xl font-bold text-[#1a1a1a] mb-2">
              Object Performance
            </h1>
          </div>
          
          <div className="flex flex-col items-center text-center md:text-start md:items-start p-4">
             <p className="text-[#b35d52] text-xs mb-2">
              DIALOGUE
            </p>
            <h1 className="text-xl font-bold text-[#1a1a1a] mb-2">
              Interview: The New Minimalists
            </h1>
            <p className="text-sm text-[#1a1a1a]">
              Why analog experiences are commanding a premium in an increasingly digitized reality, shifting the paradigm of modern luxury.
            </p>
          </div>
        </div>
      </div>
    </section>

  );
}

export default Section2;