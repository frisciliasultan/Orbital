import React, { useState } from "react";
import AutoCompleteText from "../Pages/Module Planner Page/AutocompleteText";
import { generateOptions } from "../utils/commonFunctions";
import isEmpty from "is-empty";
import { Switch, Select } from "antd";
import DynamicFieldSet from "./DynamicFieldSet";

const Options = (props) => {
    const [isOpen, setIsOpen] = useState(isEmpty(props.value) || !props.value ? false : true);
    const { Option } = Select;

    let value;
    if (!isEmpty(props.value)) {
        if(props.name === "honours") {
            value = props.value ? "With Honours" : "Without Honours"; 
        } else if(props.name === "specialisation") {
            value = props.value ? props.value : "None ";
        } else if(props.name === "secondMajors" || props.name === "minors") {
            props.value.map((object) => {
                if(value) {
                    value += `, ${object.name}`
                } else {
                    value = object.name;
                }
            })
        } else {
            value = props.value.name ? props.value.name : props.value;
        }
    } else {
        value = "None ";
    } 

    const renderContent = () => {
        if(props.editing) {
            if(props.name == "honours" || props.hidden && !isOpen) {
                return value;
            } else if(!props.hidden) {
                return (
                    <Select
                        showSearch
                        onChange={props.handleChange}
                        defaultValue="None "
                        value={value}
                        style={{ width: 300 }}
                        optionFilterProp="children"
                        filterOption={(input, option) => {
                            return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }}>
                        <Option 
                            key={"choose" + props.label}
                            value="None " 
                             disabled>
                            {"Choose " + props.label}
                        </Option>
                        {generateOptions(props.optionList, props.name)}
                    </Select> 
                    ) 
            } else if (isOpen) {
                if(!isEmpty(props.optionList)) {
                    console.log(props.value)
                return (
                    <div>
                    <DynamicFieldSet
                        label={props.label}
                        setUserInput={props.setUserInput}
                        optionList={props.optionList}
                        name={props.name}
                        value={props.value}/>
                    </div>
                )
                }
            } 
        } else {
            return value;
        }
    }

    const handleSwitch = () => {
        if(props.name === "honours") {
            
            props.setUserInput({major: {...props.major, honours: !isOpen}});
        } else {
            if(isOpen) {
                if(props.name === "specialisation") {
                    props.setUserInput({specialisation: "None "});
                } else {
                    props.setUserInput({[props.name]: []});
                }
            }
        }
        setIsOpen(!isOpen);
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
                    {(props.hidden || props.name === "honours") && props.editing
                        ? <Switch  
                            checked={isOpen} 
                            onChange={handleSwitch}/>
                        : null}
                </td>
            </tr>
    )        
}

export default Options;