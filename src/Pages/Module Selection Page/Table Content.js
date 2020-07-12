import React from "react";
import { generateOptions } from "../../utils/commonFunctions";
import { Select, Empty } from "antd";
import isEmpty from "is-empty"

export const TableContent = (props) => {
    let totalMCs = 0;

    const modules =  props.module.filter((object, i) => object.location === props.title);
    const makeTable = () => {
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
 
    if(props.category === "tables") {
        return (
            <div>
                <h3>{props.title}</h3> 
                <table className="table table-hover">
                    <tbody>
                        {makeTable()}
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
                            <thead className="cap-table-header">
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
                            {isEmpty(modules) && !props.category
                                ? <Empty
                                    imageStyle={{margin: "20px"}}
                                    description={
                                        <div>
                                            <span>
                                                No data
                                            </span> 
                                            <br/>
                                            <span>
                                                Add modules by clicking the button below!
                                            </span>
                                        </div>
                                        }/>
                                : makeTable()}
                        </tbody>
            </div>
        )
        
    }
}




