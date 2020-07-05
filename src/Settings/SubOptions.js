import React from "react";
import { generateOptions } from "../utils/commonFunctions";

const SubOptions = (props) => {
    return (
        <label>{props.label + ":"}</label>
        <select
            name={props.name}
            onChange={handleChange}
            value={props.value}>
            <option selected disabled>
                {"Choose " + props.label}
            </option>
            {generateOptions(props.settings.facultyOptions, props.name)}
        </select> 
    )
        
}

export default SubOptions;