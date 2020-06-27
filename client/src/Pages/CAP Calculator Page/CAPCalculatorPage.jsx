import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { setSemesterOptions, calculateCAP, setCAP } from '../../actions/capActions';
import { updateSettings } from "../../actions/settingsActions";
import { setSelectedModules } from "../../actions/modplanActions";
import { generateOptions, handleSaveClick } from "../../utils/commonFunctions";
import isEmpty from 'is-empty';


const CAPCalculatorPage = (props) => {
    const gradeList = [
                        {grade: "A+", gradePoint: 5},
                        {grade: "A", gradePoint: 5},
                        {grade: "A-", gradePoint: 4.5},
                        {grade: "B+", gradePoint: 4},
                        {grade: "B", gradePoint: 3.5},
                        {grade: "B-", gradePoint: 3},
                        {grade: "C+", gradePoint: 2.5},
                        {grade: "C", gradePoint: 2},
                        {grade: "D+", gradePoint: 1.5},
                        {grade: "D", gradePoint: 1},
                        {grade: "F", gradePoint: 0}
    ]       

    //to count what semester the user is in currently
    const [isPast, setIsPast] = useState();
    const [userSemester, setUserSemester] = useState();
    const [semester, setSemester] = useState("Year 1 Semester 1");
    
    useEffect(() => {
        if (!isEmpty(props.settings.userInfo.modPlan) && isEmpty(props.selectedModules)) {
            props.setSelectedModules(null, props.settings.userInfo.modPlan)
        } 

        if(!isEmpty(props.settings.userInfo.transcript) && isEmpty(props.cap.transcript)) {
            props.setTranscript(null, props.settings.userInfo.transcript)
        }

        if(props.settings.userInfo.cap) {
            props.setCAP(props.settings.userInfo.cap);
            props.setCAP(props.settings.userInfo.targetCAP, "target");
        }
    }, [props.settings.userInfo])

    useEffect(() => {
        if(!isEmpty(props.settings.userInfo)) {
            //set semester options according to how many years the user will spend in NUS
            const start = props.settings.userInfo.matriculationYear.substr(0, 4);
            const end = props.settings.userInfo.targetGradYear.substr(5, 4);
            const diff = end - start;
            props.setSemesterOptions(diff);

            const year = props.settings.currentAY.substr(5,4);
            const statusYear = year - start; 
            const updatedUserSemester = props.settings.currentSemester === "Semester 1" 
                ? statusYear * 2 - 1 
                : statusYear * 2;
            const updatedUserAY = `Year ${Math.ceil(updatedUserSemester / 2)} ${props.settings.currentSemester}`;
            setUserSemester(updatedUserSemester);
            setSemester(updatedUserAY);
        }
    }, [props.settings.userInfo.matriculationYear, props.settings.userInfo.targetGradYear])

    useEffect(() => {
        const convertSemToNumber = (sem) => {
            if(sem.substr(7) === "Semester 1") {
                return sem.substr(5,1) * 2 - 1;
            } else {
                return sem.substr(5,1) * 2;
            }
        }

        const currSem = convertSemToNumber(semester);

        //check if the semester chosen is in the past or future
        if (userSemester > currSem) {
            setIsPast(true);
        } else if (userSemester === currSem) {
            if ((props.settings.currentSemester === "Semester 1" && props.settings.month === 12) 
                || (props.settings.currentSemester === "Semester 2" && props.settings.month >= 6)) {
                    setIsPast(true);
            }
        } else {
            setIsPast(false);
        }
    }, [semester])

    useEffect(() => {
        props.calculateCAP(props.modplan.selectedModules);
    }, [props.modplan.selectedModules])

    // const checkDuplicate = (moduleAdded, transcript) => {
    //     let indexOfDuplicate;
    //     let unique = true;
    //     let newModule;

    //     for(let i = 0; i < transcript.length; i++) {
    //         if(transcript[i].moduleCode === moduleAdded.moduleCode) {
    //              indexOfDuplicate = i;
    //              unique = false;
    //         }
    //     }

    //     //if moduleAdded exists in transcript, create a module 
    //     if(!unique) {
    //         newModule = {
    //             moduleCode: transcript[indexOfDuplicate].moduleCode,
    //             title: transcript[indexOfDuplicate].title,
    //             moduleCredit: transcript[indexOfDuplicate].moduleCredit,
    //             grade: transcript[indexOfDuplicate].grade,
    //             SU: transcript[indexOfDuplicate].SU
    //         }
    //     }

    //     const result = {
    //         unique: unique,
    //         indexOfDuplicate: indexOfDuplicate,
    //         newModule: newModule
    //     }
    //     console.log(result);
    //     return result;
    // }

    const handleGradeClick = (e, object) => {
        // let module;
        // let isUnique;
        // let index;
        // const transcript = isPast ? props.cap.transcript : props.cap.targetGrade;

        // //default module
        // module = {
        //             moduleCode: object.moduleCode,
        //             title: object.title,
        //             moduleCredit: object.moduleCredit,
        //             grade: e.target.value,
        // };

        // //to obtain module object from transcript for modification
        // if(!isEmpty(transcript)) {
        //     const { unique, indexOfDuplicate, newModule} = checkDuplicate(object, transcript);
        //     if(!unique) {
        //         newModule.grade = e.target.value;
        //         module = newModule;
        //     }
        //     isUnique = unique;
        //     index = indexOfDuplicate;
        // } 

        // const cat = isPast ? "transcript": "targetGrade"
        // return props.setTranscript(module, transcript, isUnique, index, cat); 

        let gradePoint;
        for (let i = 0; i < gradeList.length; i++) {
            if(gradeList[i].grade === e.target.value) {
                gradePoint = gradeList[i].gradePoint;
                break;
            }
        }
        
        const module = {...object}
        if(isPast) {
            module.grade = e.target.value;
            module.gradePoint = gradePoint;
            module.targetGrade = undefined;
        } else {
            module.targetGrade = e.target.value;
            module.gradePoint = gradePoint;
        }
        
        props.setSelectedModules(module, props.modplan.selectedModules);
    }

    const handleCheckboxChange = (e, object) => {
        // let module;
        // let isUnique;
        // let index;
        // const transcript = props.cap.transcript;

        // //default module
        // module = {
        //     moduleCode: object.moduleCode,
        //     title: object.title,
        //     moduleCredit: object.moduleCredit,
        //     SU: true
        // };

        // //to obtain module object from transcript for modification
        // if(!isEmpty(transcript)) {
        //     const { unique, indexOfDuplicate, newModule} = checkDuplicate(object, transcript);
        //     if(!unique) {
        //         newModule.SU = newModule.SU ? false : true;
        //         module = newModule; 
        //     }
        //     isUnique = unique;
        //     index = indexOfDuplicate;
        // } 

        // return props.setTranscript(module, transcript, isUnique, index);
        const module = {...object};
        module.SU = object.SU ? false : true;
        props.setSelectedModules(module, props.modplan.selectedModules);
    }

    const generateTable = () => {
            return props.modplan.selectedModules
                .filter((object) => object.location === semester)
                .map((object) => {
                    const { moduleCode, title, moduleCredit } = object;
                    return (
                        <tr key={moduleCode}>
                            <td>{title}</td>
                            <td>{moduleCode}</td>
                            <td>{moduleCredit}</td>
                            <td>
                                <select 
                                    name={object}
                                    value={object.grade || object.targetGrade} 
                                    onChange={(e) => handleGradeClick(e, object)}>
                                    <option selected disabled>Grade</option>
                                    {generateOptions(gradeList, "grade")}
                                </select>
                            </td>
                            {isPast && 
                            <td>
                                <input
                                    type="checkbox"
                                    checked={object.SU}
                                    onChange={(e) => handleCheckboxChange(e, object)}/>
                            </td>}
                        </tr>
                    )
                })   
    }
    
    return(
        <div className="ml-4">
            <h1 className="display-3">CAP Calculator</h1>
            <h3>Current CAP: {props.cap.cap}</h3>
            <h3>Target CAP: {props.cap.targetCAP}</h3>
            {/* <h5 onClick={() => {this.setState({open: true})}}>Or click here to manually input CAP</h5> */}
            {/* {this.state.open && (<input type="text"/>)} */}
            <label>Semester: </label>
            <select 
                id="time"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}>

                {/* buffer to display to wait for userInfo */}
                {isEmpty(props.cap.semesterOptions) && <option>Year 1 Semester 1</option>}
                {generateOptions(props.cap.semesterOptions)}
            </select>
            <br/>
            
            <h3>Courses taken this semester</h3>
            <table className="table table-hover">
                <th>Module Title</th>
                <th>Module Code</th>
                <th>Modular Credits</th>
                <th>{isPast ? "Grade" : "Target Grade"}</th>
                {isPast && <th>S/U</th>}
                <tbody>
                    {!isEmpty(props.settings.userInfo) && generateTable()}
                </tbody>
            </table>
            <button onClick={() => handleSaveClick(props)}>{isPast ? "Save Transcript" : "Save Target Grade" }</button>
        
        </div>
    );
}


CAPCalculatorPage.propType = {
    setSemesterOptions: PropTypes.func.isRequired,
    setSelectedModules: PropTypes.func.isRequired,
    updateSettings: PropTypes.func.isRequired,
    generateOptions: PropTypes.func.isRequired,
    calculateCAP: PropTypes.func.isRequired,
    setCAP: PropTypes.func.isRequired,
    settings: PropTypes.object.isRequired,
    cap: PropTypes.object.isRequired,
    selectedModules: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    settings: state.settings,
    cap: state.cap,
    modplan: state.modplan
});

export default connect(mapStateToProps,
                        { setSemesterOptions, setSelectedModules, updateSettings, calculateCAP, setCAP })
                        (CAPCalculatorPage);



 {/* <label>CAP: </label>
            <input type="text" name="prevCAP" />
            <label>Credits Earned: </label>
            <input type="text" name="prevCreditsEarned" />
            <br/>
            <br/> */}



 {/* <label>Module</label>
            <label>Grade</label>
            <br/>
            <input type="text" placeholder="Credits"/>
            <input type="text" placeholder="MCs" /> */}