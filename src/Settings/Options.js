import React, { useState } from "react";
import AutoCompleteText from "../Pages/Module Planner Page/AutocompleteText";
import { generateOptions } from "../utils/commonFunctions";
import isEmpty from "is-empty";
import { Switch } from "antd";
import DynamicFieldSet from "./DynamicFieldSet";

const Options = (props) => {
    // const optionList = !isEmpty(props.optionList) ? props.optionList : null;
    // const status = props.status[0].toUpperCase() + props.status.slice(1);
    const [isOpen, setIsOpen] = useState(false);

    const renderContent = () => {
        if(props.editing) {
            if(!props.hidden || (isOpen && !props.category )) {
                return (
                    <select
                        name={props.name}
                        onChange={props.handleChange}
                        defaultValue="None"
                        value={props.value}>
                        <option 
                            key={"choose" + props.label}
                            value="None" 
                             disabled>
                            {"Choose " + props.label}
                        </option>
                        {generateOptions(props.optionList, props.name)}
                    </select> ) 
            } else if (isOpen && props.category) {
                return (
                    <div>
                    <p>{props.value}</p>
                    <AutoCompleteText 
                        category={props.category}/>
                    <DynamicFieldSet
                        name={props.category}/>


                    </div>
                )
            } else {
                return props.value;
            }
        } else {
            return props.value;
        }
    }
    return (
            <tr>
                <td>
                    <label>{props.label}</label>
                </td>

                <td>
                    {renderContent()}
                </td>

                <td>
                    {props.hidden && props.editing
                        ? <Switch   
                            onChange={() => setIsOpen(!isOpen)}/>
                        : null}
                </td>
            </tr>
    )        
}

export default Options;