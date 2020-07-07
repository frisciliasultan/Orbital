import React from "react";
import { generateOptions } from "../utils/commonFunctions";
import isEmpty from "is-empty";

const Options = (props) => {
    // const optionList = !isEmpty(props.optionList) ? props.optionList : null;
    // const status = props.status[0].toUpperCase() + props.status.slice(1);
    return (
            <tr>
                <td>
                    <label>{props.label}</label>
                </td>

                <td>
                    {props.editing ? (
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
                    ) : props.value}
            
                </td>
            </tr>
    )        
}

export default Options;