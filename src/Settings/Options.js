import React from "react";
import { generateOptions } from "../utils/commonFunctions";
import isEmpty from "is-empty";

const Options = (props) => {
    // const optionList = !isEmpty(props.optionList) ? props.optionList : null;
    const status = props.status[0].toUpperCase() + props.status.slice(1);
    return (
        <div>
            <label>{props.label + props.value}</label>
            <br/>
            <select
                name={props.name}
                onChange={props.handleChange}
                value={props.value}>
                <option 
                    key={"choose" + props.label}
                    value="N/A" 
                    selected disabled>
                    {"Choose " + props.label}
                </option>
                {generateOptions(props.optionList, props.name)}
            </select> 
            <br/>
            <br/>
        </div>
    )        
}

export default Options;