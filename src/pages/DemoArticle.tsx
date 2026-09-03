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
import section1img from "../images/section1img.jpg"
//import Footer from "../components/footer";

function DemoArticle(){
  return(
    <>
    <Navbar/>
    <div className="flex flex-col items-center">

      {/* SECTION 1 */}
      <section className="flex items-center justify-center mt-[80px] py-8 px-14 md:px-90">
        <div className="flex flex-col flex-wrap items-center text-center   gap-4">
          <p className=" text-xs text-[#b35d52] ">
            Architecture & Design
          </p>
          <h1 className="font-bold text-3xl md:text-4xl">
            The Quiet Resurgence of Brutalism in Modern Interfaces
          </h1>
          <p className="text-xs md:text-sm ">
            How raw structural logic is reclaiming digital spaces from the era of flat design and generic minimalism.
          </p>
          <div></div>
        </div>
      </section>
       {/* SECTION 2 */}
      <section>
        <img src={section1img} className="h-full md:w-[1000px] object-cover"></img>
      </section>
      {/* SECTION 3 */}
      <section className="flex flex-col px-[80px]  px-14 md:px-90 mt-15">
        <p className="text-xs md:text-sm">
          <span className="font-bold text-4xl">T</span>he digital landscape has spent the last decade softening its edges. We rounded our corners, added subtle drop shadows to simulate tactile depth, and embraced a ubiquitous flat aesthetic that, while highly functional, often lacked a distinct soul. The pursuit of frictionless user experiences inadvertently led to a homogenization of visual identity across platforms. However, a stark counter-movement is quietly gaining momentum, drawing profound inspiration from a mid-century architectural philosophy that once polarized the physical world: Brutalism.
        </p>

        <p className="text-xs md:text-sm mt-4">
          In its architectural form, Brutalism—derived from the French béton brut (raw concrete)—was defined by its uncompromising exposure of building materials and structural elements. It was honest, imposing, and devoid of superficial ornamentation. Today, digital brutalism adopts a similar ethos, stripping away the decorative layers of UI design to expose the underlying framework of the web.
        </p>

        <h1 className="font-bold text-xl mt-5">
          Exposing the Framework
        </h1>

        <p className="text-xs md:text-sm mt-4">
          Modern interfaces that embrace this style are characterized by stark contrasts, monospaced typography, asymmetrical layouts, and a deliberate absence of spatial harmony. It is a rebellion against the carefully curated, often sanitized, aesthetic of contemporary web design.
        </p>

        <div className="flex flex-col p-4 border-l-2 border-[#b35d52] mt-4">
          <h1 className="font-bold text-3xl italic ">
            "It is not merely an aesthetic choice; it is a structural philosophy demanding transparency in an era of obfuscation."
          </h1>
          <p className="text-[10px] mt-4">— Julian Cole, Design Theorist</p>
        </div>

        <div className="flex flex-col border-b border-[#dbdad9]">
          <p className="text-xs md:text-sm mt-4">
          This resurgence is not purely nostalgic; it serves a functional purpose in a complex digital environment. By exposing the raw HTML structures, utilizing default browser styling, and employing harsh grid systems, these interfaces demand attention. They force users to engage with the content without the pacifying effects of smooth gradients or bouncy animations.
          </p>

          <p className="text-xs md:text-sm mt-4 mb-10">
            The challenge, for contemporary designers, is integrating this raw aesthetic within platforms that demand high usability. The result is a hybrid approach—often referred to as 'Neubrutalism'—which pairs the structural honesty of brutalism with modern typographic rigor and accessibility standards.
          </p>
        </div>

        <div className="flex flex-row mt-10 gap-2">
          <h1 className="bg-[#f5f3f3] text-[10px] p-1">Design Theory</h1>
          <h1 className="bg-[#f5f3f3] text-[10px] p-1">UI Architecture</h1>
          <h1 className="bg-[#f5f3f3] text-[10px] p-1">Web Trends</h1>
        </div>
        
      </section>
      {/* SECTION 4 */}
      <section>

      </section>

    </div>
    {/* <Footer/>  */}
    </>
  
  );
}

export default DemoArticle;