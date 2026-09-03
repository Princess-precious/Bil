/**
    * @description      : 
    * @author           : HP
    * @group            : 
    * @created          : 02/09/2026 - 15:07:26
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 02/09/2026
    * - Author          : HP
    * - Modification    : 
**/


function Hero() {
  return(
    <section className="flex flex-col md:flex-row mt-[80px] h-auto py-8 px-14  bg-[#fbf9f8] justify-between ">
      <div className="flex flex-col flex-wrap  gap-4 items-center text-center md:text-start md:items-start">
        <h1 className="text-4xl text-[#1a1a1a] font-bold text-center">Good morning, Reader.</h1>
        <p className="text-sm text-[#1a1a1a]">
          Your personalized editorial feed. Curated insights, deep dives, and perspectives tailored to your intellectual pursuits.
        </p>
      </div>
      
    </section>
  );
}
export default Hero;