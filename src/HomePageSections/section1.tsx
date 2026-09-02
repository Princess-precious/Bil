/**
    * @description      : 
    * @author           : HP
    * @group            : 
    * @created          : 01/09/2026 - 23:52:52
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 01/09/2026
    * - Author          : HP
    * - Modification    : 
**/
import section1img from "../images/section1img.jpg";

function Section1() {
  return(
    <section className="bg-[#fbf9f8] h-auto mt-[80px] px-14 py-12 flex flex-col justify-center md:flex-row md:justify-between items-center gap-10 border-b border-[#dbdad9] ">
      <div className="flex flex-2  rounded-lg items-center order-2 md:order-1 mt-10 p-4">
        <img src={section1img} alt="Section 1 img" className="flex w-full h-full object-cover shadow-2xl"></img>
      </div>

      <div className="flex-1 flex flex-col items-center text-center  order-1 md:order-2 mt-10 md:items-start md:text-left p-4">
        <p className="text-[#b35d52] text-xs mb-4">Design & Form</p>
        <h1 className="text-6xl font-bold text-[#1a1a1a]">
          The Architecture of Silence.
        </h1>
        <p className="text-sm text-[#1a1a1a] mt-4 mb-4">
          Exploring the interplay between negative space and structural mass in contemporary urban environments
        </p>
        <div className="flex flex-row gap-4">
          <button className= " flex gap-1 text-[#1a1a1a] underline text-xs hover:opacity-80 active:opacity-80 p-2">
            READ ESSAY
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </section>

  );
}

export default Section1;