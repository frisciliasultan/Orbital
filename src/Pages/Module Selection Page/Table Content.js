import React, { useState, useEffect } from "react";
import { generateOptions } from "../../utils/commonFunctions";
import { Select, Empty } from "antd";
import isEmpty from "is-empty"


let semesterCount = 0;
let noModulesSemesterCount = 0;
export const TableContent = (props) => {
    let totalMCs = 0;
    // const [modules, setModules] = useState();
    const modules =  props.module.filter((object, i) => object.location === props.title);
    
    //update modules
    // useEffect(() => {
    //     const filteredModules =  props.module.filter((object, i) => object.location === props.title);
    //     setModules(filteredModules);
    // }, [props.module])

    const makeTable = () => {
        console.log(props.module)
        return (
            modules.map((object, i) => {
                const {moduleCode, title, moduleCredit} = object;

                if(props.category === "tables") {
                    const desc = title.replace(/ /g, '-');
                    const link = `https://nusmods.com/modules/${moduleCode}/${desc}`
                    totalMCs += Number(object.moduleCredit);

                    return (
                        <tr key={moduleCode} >
                            <a href={link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-white text-decoration-none">
                                    <td>{moduleCode}</td>
                                    <td>{title}</td>
                                    <td>{moduleCredit + 'MCs'}</td>
                            </a>
                        </tr>
                    )   
                } else {
                    return (
                        
                        <tr className="cap-table-row" key={moduleCode}>
                            <td>{moduleCode}</td>
                            <td>{title}</td>
                            <td>{moduleCredit + 'MCs'}</td>
                            <td>
                                <Select 
                                    name={object}
                                    value={object.grade || object.targetGrade} 
                                    onChange={(value, object) => props.handleGradeClick(value, object, props.isPast)}
                                    style={{ width: 70 }}>
                                    {generateOptions(props.gradeList, "grade", object)}
                                </Select>
                            </td>
                            {props.isPast && 
                            <td>
                                <input
                                    className="checkbox"
                                    type="checkbox"
                                    checked={object.SU}
                                    onChange={(e) => props.handleCheckboxChange(e, object)}/>
                            </td>}
                            {!props.category && (
                                <td>
                                    <i  
                                        className="fa fa-trash-alt fa-border"
                                        style={{cursor: "pointer"}}
                                        onClick={() => props.setModuleLocation({id: object.moduleCode}, null, null, props.module)} />
                                </td>
                            )}
                        </tr>
                    )
                }     
            })
        )
    }

    const handleEmpty = () => {
        console.log(modules)
        if(isEmpty(modules)) {
            if(props.category === "capTable" && !props.lastInCategory) {
                semesterCount += 1;
                noModulesSemesterCount += 1;
            } else if(!props.category ||
                (semesterCount === noModulesSemesterCount && props.lastInCategory)) {
                    //reset sem and nomodulesem count
                    semesterCount = 0;
                    noModulesSemesterCount = 0;
                    return (
                        <Empty
                            imageStyle={{margin: "20px"}}
                            description={
                                <div>
                                    <span>
                                        No data
                                    </span> 
                                    <br/>
                                    {!props.category && (
                                        <span>
                                            Add modules by clicking the button below!
                                        </span>
                                    )}  
                                </div>
                                }/>
                    )
            }
        } else if (props.category === "capTable" && !props.lastInCategory) {
                semesterCount += 1;
                return makeTable();
            
        } else {
            semesterCount = 0;
            noModulesSemesterCount = 0;
            return makeTable();
        }
    }
 
    if(props.category === "tables") {
        return (
            <div>
                <h3>{props.title}</h3> 
                <table className="table table-hover">
                    <tbody>
                        {handleEmpty()}
                    </tbody>
                </table>
            </div>
        )
    } else {
        return (
            <div className="cap-table-header-body">
                    {props.displayHeader && (
                        <h4>{props.isPast ? "Past Semester" : "Future Semester"}</h4>
                    )}
                    {(!props.category || props.displayHeader) &&  
                        (   
                            <thead className={props.isPast ? "cap-table-header" : "cap-table-header isPast"}>
                            <th>Module Code</th>
                            <th>Module Title</th>
                            <th>Modular Credits</th>
                            <th>{props.isPast ? "Grade" : "Target Grade"}</th>
                            {props.isPast && <th>S/U</th>}
                            {!props.category && <th></th>}
                            </thead>
                        )
                    }
                        <tbody className="cap-table-body">
                            {props.category && !isEmpty(modules) && (
                                <tr>
                                    <h6 className="table-semester-header">{props.title}</h6>
                                </tr>
                            )}
                            {handleEmpty()}
                        </tbody>
            </div>
        )
        
    }
}




