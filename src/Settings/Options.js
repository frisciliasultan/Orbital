import React, { useState } from "react";
import AutoCompleteText from "../Pages/Module Planner Page/AutocompleteText";
import { generateOptions } from "../utils/commonFunctions";
import isEmpty from "is-empty";
import { Switch, Select } from "antd";
import DynamicFieldSet from "./DynamicFieldSet";

const Options = (props) => {
    const [isOpen, setIsOpen] = useState(props.value ? true : false);
    const { Option } = Select;

    const renderContent = () => {
        if(props.editing) {
            if(!props.hidden || (isOpen && !props.category )) {
                return (
                    <Select
                        showSearch
                        // name={props.name}
                        onChange={props.handleChange}
                        defaultValue="None "
                        value={props.value ? props.value : "None"}
                        style={{ width: 300 }}
                        optionFilterProp="children"
                        filterOption={(input, option) => {
                            console.log(option)
                            return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        
                        }
                    >
                        <Option 
                            key={"choose" + props.label}
                            value="None" 
                             disabled>
                            {"Choose " + props.label}
                        </Option>
                        {generateOptions(props.optionList, props.name)}
                    </Select> ) 
            } else if (isOpen && props.category) {
                return (
                    <div>
                    {/* <p>{props.value}</p> */}
                    <DynamicFieldSet
                        setUserInput={props.setUserInput}
                        options={props.optionList}
                        name={props.category}
                        value={props.value}/>
                    </div>
                )
            } else {
                return props.value ? props.value : "None";
            }
        } else {
            return props.value ? props.value : "None";
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
                            checked={isOpen} 
                            onChange={() => setIsOpen(!isOpen)}/>
                        : null}
                </td>
            </tr>
    )        
}

export default Options;