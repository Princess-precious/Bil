/**
    * @description      : 
    * @author           : HP
    * @group            : 
    * @created          : 08/09/2026 - 14:41:27
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 08/09/2026
    * - Author          : HP
    * - Modification    : 
**/
import woman from "../images/woman.png"
import art from "../images/art.png"
import studyroom from "../images/studyroom.jpg"
import {useState, useEffect} from "react"
import walls from "../images/walls.png"
import hand from "../images/hand.png"

function Carousel(){
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {

    const interval = setInterval(() => {

      setCurrentSlide((prevSlide) => (prevSlide + 1) % 5);

    }, 5000);

  return () => clearInterval(interval);

  }, []);
  
  return(
    <div  className="relative h-screen overflow-hidden">

      <div className="flex h-full transition-transform duration-3000 ease-in-out" style={{transform: `translateX(-${currentSlide * 100}%)`,}} >
        {/* 1 */}
        <section className="relative h-screen min-w-full bg-cover bg-center" style={{ backgroundImage: `url(${woman})` }}>
          <div className="absolute inset-0 bg-black/50"></div>
        
          <div className="relative z-10 flex flex-col flex-wrap gap-2 pt-[400px] md:pt-[250px] pr-[100px] md:pr-[800px] pl-12">
            <p className="text-[#b35d52] text-[10px] md:text-xs">CREATIVE INTENTION</p>
            <h1 className="text-white font-bold text-xl md:text-4xl ">
              Form is not what we build to be seen. It is the quiet space we carve to discover who we are in stillness.
            </h1>
          </div>
        </section>
          {/* 2 */}
        <section className="relative h-screen min-w-full bg-cover bg-center" style={{ backgroundImage: `url(${art})` }}>
          <div className="absolute inset-0 bg-black/50"></div>
        
          <div className="relative z-10 flex flex-col flex-wrap gap-2 pt-[250px] md:pt-[250px] px-6 md:pr-12 md:pl-[700px]">
            <div  className="inline-block bg-black px-6 py-4">
             <p className="text-[#b35d52] text-[10px] md:text-xs">WORDS & ESSENCE</p>
              <h1 className="text-white font-bold text-xl md:text-4xl ">
                Ideas are fragile as folded paper until given breath by conviction. Write what you dare not speak.
              </h1>
            </div>
          </div>
        </section>
          {/* 3 */}
        <section className="relative h-screen min-w-full bg-cover bg-center" style={{ backgroundImage: `url(${studyroom})` }}>
          <div className="absolute inset-0 bg-black/50"></div>
        
          <div className="relative z-10 flex flex-col  flex-wrap gap-2 pt-[150px] pl-[100px] pr-12 md:pl-[700px]">
            <p className="text-[#b35d52] text-[10px] md:text-xs">THE CRAFT OF BEING</p>
            <h1 className="text-white font-bold text-xl md:text-4xl ">
              Do not rush the ink. In a world breathless for speed, the truest luxury is lingering long enough to understand.
            </h1>
          </div>
        </section>
        {/* 4 */}
        <section className="relative h-screen min-w-full bg-cover bg-center" style={{ backgroundImage: `url(${walls})` }}>
          <div className="absolute inset-0 bg-black/50"></div>
        
          <div className="relative z-10 flex flex-col flex-wrap gap-2 pt-[250px] md:pt-[250px] px-6 md:pr-12 md:pl-[700px]">
            <div  className="inline-block bg-black px-6 py-4">
             <p className="text-[#b35d52] text-[10px] md:text-xs">ARCHITECTURE OF SOLITUDE</p>
              <h1 className="text-white font-bold text-xl md:text-4xl ">
                Solitude is not the absence of company, but the presence of clarity.
              </h1>
            </div>
          </div>
        </section>
        {/* 5 */}
        <section className="relative h-screen min-w-full bg-cover bg-center" style={{ backgroundImage: `url(${hand})` }}>
          <div className="absolute inset-0 bg-black/50"></div>
        
          <div className="relative z-10 flex flex-col  flex-wrap gap-2 pt-[150px] pl-[100px] pr-12 md:pl-[700px]">
            <p className="text-[#b35d52] text-[10px] md:text-xs">THE DISCIPLINE OF INK</p>
            <h1 className="text-white font-bold text-xl md:text-4xl ">
              A sentence well-wrought outlives the noise of a thousand rushed opinions.
            </h1>
          </div>
        </section>
      </div>
       
    </div>
    
  );
}
export default Carousel;