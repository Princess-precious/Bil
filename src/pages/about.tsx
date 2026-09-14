/**
    * @description      : 
    * @author           : HP
    * @group            : 
    * @created          : 13/09/2026 - 23:36:34
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 13/09/2026
    * - Author          : HP
    * - Modification    : 
**/
import Footer from "../components/footer";
import Navbar from "../components/Navbar"

function About(){
  return(
    <div className="min-h-screen flex flex-col">
      <Navbar/>
      <div className="flex-1 flex flex-col mt-[80px] px-20 font-hanken">
        <section className="flex flex-col gap-2 py-8 md:pr-100">
          <p className="text-xs font-bold text-[#b35d52]">
            <span className="inline-block w-1.5 h-1.5 bg-[#b35d52] rounded-full"></span> About Bil
          </p>
          <h1 className="text-2xl md:text-4xl font-playfair font-bold">A Quiet Sanctuary for Thought.</h1>
          <p className="text-xs">
            Bil was founded as an antidote to algorithmic velocity—a dedicated home for architectural essays, thoughtful critiques, and slow-crafted prose. We believe words and ideas retain their highest power when granted space, deliberation, and unhurried craft.
          </p>
        </section>

        <section className="flex flex-col mt-2  gap-2">
          <div className="flex flex-row justify-between">
            <h1 className="text-xs text-[#b35d52]">Core Principles</h1>
            <h1 className="text-xs">THREE PILLARS</h1>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between gap-14">

            <div className="flex flex-col bg-[#eeebeb] p-4 gap-2 rounded-md">
              <p className="text-sm text-[#b35d52]">01</p>
              <h1 className="text-xl md:text-2xl font-playfair font-bold">Unhurried Thought</h1>
              <p className="text-xs">
                We abandon the immediate news cycle in favor of thorough inquiry, deep research, and long-lasting perspectives.
              </p>
            </div>

            <div className="flex flex-col bg-[#eeebeb] p-4 gap-2 rounded-md">
              <p className="text-sm text-[#b35d52]">02</p>
              <h1 className="text-xl md:text-2xl font-playfair font-bold">Curation & Panache</h1>
              <p className="text-xs">
                Typographic discipline, calm composition, and deliberate negative space designed to elevate prose without distraction.
              </p>
            </div>

            <div className="flex flex-col bg-[#eeebeb] p-4 gap-2 rounded-md">
              <p className="text-sm text-[#b35d52]">03</p>
              <h1 className="text-xl md:text-2xl font-playfair font-bold">Reader Sovereignty</h1>
              <p className="text-xs">
                Zero intrusive ads, tracking bloat, or manipulative clicks. A respectful reading space honoring your quiet attention.
              </p>
            </div>

            
          </div>
        </section>
      </div>
      <Footer/>
    </div>
  );
}
export default About;