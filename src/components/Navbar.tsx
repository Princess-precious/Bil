/**
    * @description      : 
    * @author           : HP
    * @group            : 
    * @created          : 01/09/2026 - 22:33:46
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 01/09/2026
    * - Author          : HP
    * - Modification    : 
**/
import { Link } from "react-router-dom";
import {useState} from "react";
import Button from "../ui/button";

function Navbar() {
   const [showMenu, setShowMenu] = useState(false);
  return(
    <>
    <nav className="fixed top-0 left-0 w-full bg-[#fbf9f8] py-4 px-14 flex items-center justify-between h-[80px]">
      <div className="flex items-center gap-2">
        <Link to="/" className="text-[#1a1a1a] text-5xl font-bold">BIL</Link>
      </div>
        
      <div className="hidden md:flex md:items-center md:gap-6 md:text-lg text-[#1a1a1a]">
        <Link to="" className="hover:text-underline active:underline">Feed</Link>
      </div>

      <div className="hidden md:flex md:items-center md:gap-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <Button className=" text-sm p-2">WRITE A STORY</Button>
      </div>
      {/* hamburger button */}
      <button
      className="md:hidden"
      onClick={() => setShowMenu(!showMenu)}>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1a1a1a"><path d="M120-680v-80h720v80H120Zm0 480v-80h720v80H120Zm0-240v-80h720v80H120Z"/></svg>
      </button>
    </nav>

    {showMenu && (
    <div className="md:hidden bg-white flex flex-col items-center  gap-4 p-4  fixed top-[80px] right-0 z-40 ">
      <div className="flex flex-col items-center gap-6 text-sm text-black order-2">
        <Link to="" className="hover:text-underline active:underline">Feed</Link>
      </div>

      <div className="order-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      </div>
      
      <Button className=" text-xs p-1 order-3">WRITE A STORY</Button>
    </div>
        
    
    )}
   </>
  );
}

export default Navbar;