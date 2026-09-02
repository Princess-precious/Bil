/**
    * @description      : 
    * @author           : HP
    * @group            : 
    * @created          : 02/09/2026 - 10:25:37
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 02/09/2026
    * - Author          : HP
    * - Modification    : 
**/
/**
    * @description      : 
    * @author           : HP
    * @group            : 
    * @created          : 27/08/2026 - 14:24:51
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 27/08/2026
    * - Author          : HP
    * - Modification    : 
**/
import { Link } from "react-router-dom";

function Footer(){
  return(
    <section className="bg-[#efeded] py-4 px-12 flex flex-col gap-4 md:flex-row items-center justify-between h-auto text-center md:text-start border-t-1 border-white">
      <div>
        <h1 className="text-4xl font-bold text-[#1a1a1a]">BIL</h1>
        <p className="mt-6 text-xs text-[#1a1a1a]">
          © 2026 BIL. All rights reserved. Clean and Panache.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <Link to="" className="text-xs underline text-[#1a1a1a] hover:opacity-80 active:opacity-80">ABOUT</Link>
        <Link to="" className="text-xs underline text-[#1a1a1a] hover:opacity-80 active:opacity-80">PRIVACY</Link>
        <Link to="" className="text-xs underline text-[#1a1a1a] hover:opacity-80 active:opacity-80">TERMS</Link>
        <Link to="" className="text-xs underline text-[#1a1a1a] hover:opacity-80 active:opacity-80">CONTACT</Link>
        <Link to="" className="text-xs underline text-[#1a1a1a] hover:opacity-80 active:opacity-80">NEWSLETTER</Link>
      </div>
    </section>
  );
}

export default Footer;