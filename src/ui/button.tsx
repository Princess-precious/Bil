/**
    * @description      : 
    * @author           : HP
    * @group            : 
    * @created          : 01/09/2026 - 23:26:45
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 01/09/2026
    * - Author          : HP
    * - Modification    : 
**/
import React from "react";

type ButtonProps = {
    onClick?: () => void;
    className?: string;
    children?: React.ReactNode;
    disabled?: boolean;
}

function Button({onClick, className, children, disabled}: ButtonProps) {
    return (
        <button onClick={onClick} disabled={disabled} className={`bg-[#1a1a1a] text-white hover:opacity-80 active:opacity-80 ${className ?? ""}`}>
            {children}
        </button>
    )
}

export default Button;