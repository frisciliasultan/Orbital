import React, { useState } from "react";
import Options from "./Options";

const HiddenOptions = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
        <p onClick={() => setIsOpen(!isOpen)}>{props.title}</p>
        {console.log(props.optionList)}
        {isOpen && 
            <Options
                status={props.status}
                label={props.label}
                handleChange={props.handleChange}
                name={props.name}
                value={props.value}
                optionList={props.optionList}/> }

        </div>
    )
}

export default HiddenOptions;