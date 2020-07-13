import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import AutoCompleteText from "../Module Planner Page/AutocompleteText";
import LoadingDots from "../Loading Page/LoadingDots";
import { Table } from "react-bootstrap";
import PropTypes from 'prop-types';
import { setSemesterOptions, calculateCAP, setCAP } from '../../actions/capActions';
import { updateSettings } from "../../actions/settingsActions";
import { setSelectedModules, callBackendAPI, setModuleLocation } from "../../actions/modplanActions";
import { removeSuccess } from "../../actions/successActions";
import { generateOptions, generateObject, handleSaveClick, checkIsPast } from "../../utils/commonFunctions";
import isEmpty from 'is-empty';
import { Select } from "antd";
import { generatePath } from "react-router-dom";
import { TableContent } from "../Module Selection Page/Table Content";


const CAPCalculatorPage = (props) => {
    const { Option } = Select;

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
    ];

    //whether the semester selected has been completed by user
    const [isPast, setIsPast] = useState();
    //to count what semester the user is in currently
    const [userSemester, setUserSemester] = useState();
    //semester that user selects
    const [semester, setSemester] = useState("Overview");
    //semester index that user selects 
    const [semIndex, setSemIndex] = useState();
    //AY that user selects
    const [AY, setAY] = useState();
    //whether autocomplete is open
    const [isTextBoxOpen, setIsTextBoxOpen] = useState(false);

    //call NUS MODS if it is not called already 
    // to provide pool of modules for user to select
    useEffect(() => {
        if(isEmpty(props.modplan.modules)) {
            props.callBackendAPI("NUSMods");
        }
    }, [])

    useEffect(() => {
        //if user has previously saved modPlan, 
        // transfer the information to selectedModules in modPlan Redux state
        if (!isEmpty(props.settings.userInfo.modPlan) && isEmpty(props.modplan.selectedModules)) {
            props.setSelectedModules(null, props.settings.userInfo.modPlan)
        } 

        //if user has previously saved transcript, 
        // transfer the information to transcript in cap Redux state
        if(!isEmpty(props.settings.userInfo.transcript) && isEmpty(props.cap.transcript)) {
            props.setTranscript(null, props.settings.userInfo.transcript)
        }

        //default CAP is 5 but
        //if user has previously saved CAP, transfer info to CAP in cap Redux State
        if(props.settings.userInfo.cap) {
            //if there is no targetCAP in userInfo, set targetCAP as 5
            if (!props.settings.userInfo.targetCap) {
                props.setCAP(props.settings.userInfo.cap, 5);
            } else {
                props.setCAP(props.settings.userInfo.cap, props.settings.userInfo.targetCap);
            }
        }
    }, [props.settings.userInfo])

    useEffect(() => {
        if(!isEmpty(props.settings.userInfo)) {
            //set semester options according to how many years the user will spend in NUS
            const start = props.settings.userInfo.matriculationYear.substr(0, 4);
            props.setSemesterOptions(props.settings.userInfo.matriculationYear, 
                props.settings.userInfo.targetGradYear);

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
         console.log('called')
        if(!semIndex && !isEmpty(props.cap.semesterOptions)) {
            console.log(semester)
            console.log(props.cap.semesterOptions)
            setSemIndex(props.cap.semesterOptions.indexOf(semester));
        }
    }, [props.cap.semesterOptions])

    useEffect(() => {
        if(semester !== "Overview") {
            setIsPast(
                checkIsPast(semester, userSemester, props.settings.currentSemester, props.settings.month)
                );
        }
       

        //convert semester chosen to AY
        const year = Number(semester.substr(5, 1));
        const matYear = !isEmpty(props.settings.userInfo) ? Number(props.settings.userInfo.matriculationYear.substr(0,4)) : 0;
        const end =  matYear + year;
        setAY(`${end - 1}/${end}`);
    }, [semester])

    useEffect(() => {
        if(!isEmpty(props.modplan.selectedModules)) {
            props.calculateCAP(props.modplan.selectedModules);
        }
    }, [props.modplan.selectedModules])

    const handleGradeClick = (value, object, past) => {
        let gradePoint;
        const pastSem = past ? past : isPast;
        
        for (let i = 0; i < gradeList.length; i++) {
            if(gradeList[i].grade === value) {
                gradePoint = gradeList[i].gradePoint;
                break;
            }
        }
        
        const module = {...object.object}
        if(pastSem) {
            module.grade = value;
            module.gradePoint = gradePoint;
            module.targetGrade = undefined;
        } else {
            module.targetGrade = value;
            module.gradePoint = gradePoint;
        }
        
        props.setSelectedModules(module, props.modplan.selectedModules);
    }

    const handleCheckboxChange = (e, object) => {
        const module = {...object};
        module.SU = object.SU ? false : true;
        props.setSelectedModules(module, props.modplan.selectedModules);
    }

    const handleArrowClick = (direction) => {
        
        if(direction === "right") {
            setSemIndex(semIndex + 1);
            setSemester(props.cap.semesterOptions[semIndex + 1]);
            
        } else {
            if(semIndex === 0) {
                setSemester("Overview");
            } else {
                setSemester(props.cap.semesterOptions[semIndex -1]);
            }
            setSemIndex(semIndex - 1);
            
        }
        
    }

    console.log(semIndex)
    return(
        isEmpty(props.settings.userInfo)
            ? <LoadingDots/>
            : (<div className="main-cap-div">
                <div className="cap-description">
                    <h1 className="main-title">CAP Calculator</h1>
                    <h3 className="current-cap">Current CAP: {props.cap.cap}</h3>
                    <h3 className="target-future-cap">Target Future CAP: {props.cap.targetCap}</h3>
                    <label>Semester :</label>
                    <Select 
                        id="time"
                        defaultValue="Overview"
                        value={semester}
                        onChange={(e, props) => {setSemester(e); setSemIndex(props.index);}}
                        style={{width: "250px"}}>
                        {/* buffer to display to wait for userInfo */}
                        {isEmpty(props.cap.semesterOptions) && <Option>Overview</Option>}
                        <Option value="Overview">Overview</Option>
                        {generateOptions(props.cap.semesterOptions)}
                    </Select>

             {/* <span className="fa-layers fa-fw "/> */}
                {semIndex !== -1 &&
                    (
                        <i className="fas fa-arrow-left fa-lg fa-border"
                            onClick={() => { handleArrowClick("left") }}/>
                    )
                } 
                {semIndex !== (props.cap.semesterOptions.length - 1) && 
                    (
                        <i className="fas fa-arrow-right fa-lg fa-border"
                            onClick={() => { handleArrowClick("right") }}/> 
                    )}
                </div>
            
            {/* Table to display modules taken according to modulePlanner */}

            <div className="cap-table-section container">
                <h3 id={semester === "Overview" ? "overview" : undefined}>{semester === "Overview" ? "Overview" : "Courses taken this semester"}</h3>
                <Table className="table table-hover cap-table">
                        {semester === "Overview" 
                            ? generateObject(
                                props.settings.userInfo.matriculationYear, 
                                props.settings.userInfo.targetGradYear,
                                "tables", 
                                props.modplan.selectedModules, 
                                { 
                                    handleGradeClick: handleGradeClick,
                                    handleCheckboxChange: handleCheckboxChange,
                                    setModuleLocation: props.setModuleLocation,
                                    userSemester: userSemester,
                                    currentSemester: props.settings.currentSemester,
                                    month: props.settings.month,
                                    gradeList: gradeList
                                } 
                                )
                            : (
                                <TableContent 
                                    handleGradeClick={handleGradeClick}
                                    handleCheckboxChange={handleCheckboxChange}
                                    setModuleLocation={props.setModuleLocation}
                                    module={props.modplan.selectedModules}
                                    title={semester}
                                    isPast={isPast}
                                    gradeList={gradeList}/>
                        )}
                </Table>
            </div>
            
            
            <div className="button-group">
            {/* For users to add modules directly from CAP Calculator */}
            {semester !== "Overview" && isTextBoxOpen && 
                <AutoCompleteText
                    id="cap-autocomplete"
                    AY={AY}
                    location={semester}
                    module={props.modplan.modules}
                    category="module"/>}
            
            {semester !== "Overview" && <button className="button settings-button" id="cap-add-module-button" onClick={() => setIsTextBoxOpen(!isTextBoxOpen)}>Add Module</button>}

            <button className="button settings-button" id="cap-save-cap-button" onClick={() => handleSaveClick(props)}>{isPast || semester === "Overview" ? "Save Transcript" : "Save Target Grade" }</button>
            </div>

            {!isEmpty(props.success) && 
                <p style={{color: "green"}}>
                    {props.success}
                </p>
                
                }
                
                {!isEmpty(props.success) && 
                    setTimeout(props.removeSuccess, 500) &&
                    clearTimeout(setTimeout(props.removeSuccess, 2000))}
        </div>)
    );
}


CAPCalculatorPage.propType = {
    setSemesterOptions: PropTypes.func.isRequired,
    setSelectedModules: PropTypes.func.isRequired,
    callBackendAPI: PropTypes.func.isRequired,
    setModuleLocation: PropTypes.func.isRequired,
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
    modplan: state.modplan,
    success: state.success
});

export default connect(mapStateToProps,
                        { setSemesterOptions, setSelectedModules, callBackendAPI, setModuleLocation, updateSettings, calculateCAP, setCAP, removeSuccess })
                        (CAPCalculatorPage);