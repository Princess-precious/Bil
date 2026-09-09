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
import {useLocation, Link } from "react-router-dom";

type footerProps ={
  className?:string;
}

function Footer({className}: footerProps){
  const location = useLocation()
  const ishome = location.pathname === "/"

  return(
    <section className={`${className}   py-4 px-12 flex flex-row gap-4 items-center justify-between h-auto ${ishome? "border-[#373737]" : "border-white"} border-t`}>
      <div className="flex flex-col">
        <p className="text-[10px] md:text-xs">
          © 2026 BIL. All rights reserved. Clean and Panache.
        </p>
      </div>
      <div className="flex flex-row gap-4">
        <Link to="" className=" text-[10px] md:text-xs underline  hover:opacity-80 active:opacity-80">ABOUT</Link>
        <Link to="" className="text-[10px] md:text-xs underline  hover:opacity-80 active:opacity-80">PRIVACY</Link>
      </div>
    </section>
  );
}

export default Footer;