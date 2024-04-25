
import React from "react";

const Input = ({placeholder,name,handleInput}) => {
    return(
        <main>
            <input 
                placeholder={placeholder}
                onChange={handleInput}
                name={name}
            />
        </main>
    )
}
export default Input;