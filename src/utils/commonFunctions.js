import React from "react";
import { Select } from "antd";
import { TableContent } from "../Pages/Module Selection Page/Table Content";
import  YearDisplay  from "../Pages/Module Planner Page/YearDisplay";

const { Option } = Select;

export const generateOptions = (optionList, category, object) => {
    if(optionList) {
        if(category === "grade") {
            return optionList.map((option) => {
                return (
                    <Option value={option.grade} object={object}>
                    {option.grade}
                    </Option>
                );
            })
        } else if (category === 'faculty') {
                return optionList.map((option, index) => {
                    return (
                        <Option 
                            key={option.name} 
                            value={option.name}
                            name={category}
                            selectedindex={index}>
                        {option.name}
                        </Option>
                    );
                })
        } else if (category === 'major' || category === "specialisation" 
                    || category === "secondMajor" || category === "minor" 
                        || category === "residence"
                        ) {
            return optionList.map((option, index) => {
                return (
                    <Option 
                        key={option.fullName} 
                        value={option.fullName}
                        name={category}
                        selectedindex={index}>
                    {option.fullName}
                    </Option>
                );
            })
        } else if (category === 'matriculationYear') {
            return optionList.map((option) => {
                return (
                    <Option 
                        key={option.substr(3,9)} 
                        value={option.substr(3,9)}
                        name={category}>
                    {option}
                    </Option>
                );
            })
        } else if (category === 'targetGradYear') {
            return optionList.map((option) => {
                return (
                    <Option 
                        key={option.substr(6,9)} 
                        value={option.substr(6,9)}
                        name={category}>
                    {option}
                    </Option>
                );
            })
        } 
    
        return optionList.map((option, i) => {
            return (
                <Option key={option} value={option} index={i}>
                {option}
                </Option>
            );
        });
    }
}

export const handleSaveClick = (props) => {
    const userData = {
        modPlan: props.modplan.selectedModules,
        residential: props.settings.userInfo.residential,
        faculty: props.settings.userInfo.faculty,
        facIndex: props.settings.userInfo.facIndex,
        major: props.settings.userInfo.major,
        majorIndex: props.settings.userInfo.majorIndex,
        specialisation: props.settings.userInfo.specialisation,
        matriculationYear: props.settings.userInfo.matriculationYear,
        targetGradYear: props.settings.userInfo.targetGradYear,
        cap: props.cap.cap,
        targetCap: props.cap.targetCap
    }

    props.updateSettings(userData);
}

// generate Year Cards in Module Planner Page / Tables in Mod Info Page
export const generateObject = (matriYear, gradYear, category, module, props) => {
    const matYear = Number(matriYear.substr(0, 4));
    const noOfYear = Number(gradYear.substr(5, 4)) - matYear;
    let display = [];

    if(category === "yearDisplay") {
        for(let i = 1; i <= noOfYear; i++) {
            const start = matYear + i - 1;
            display.push({
                year: `Year ${i}`,
                AY: `${start}/${start + 1}`
            })
        }
        
        return display.map((object) => {
                return (
                    <YearDisplay
                        year={object.year}
                        AY={object.AY}
                        module={module} />
                )
            })
    } else {
        let sem1;
        let sem2;

        for(let i = 1; i < (noOfYear * 2); i += 2) {
            const year = Math.ceil(i / 2);
            sem1 = `Year ${year} Semester 1`;
            sem2 = `Year ${year} Semester 2`;
            display[i - 1] = sem1;
            display[i] = sem2;
        }
        
        if(category === "semesterOptions") {
            return display;
        } else if(category === "tables") {
            let nthFutureSem = 0;
            return display.map((sem, i) => {
                if(props) {
                    const status = checkIsPast(sem, props.userSemester, props.currentSemester, props.month);
                    if(!status) {
                        nthFutureSem++
                    }
                    return (
                        <TableContent
                            title={sem}
                            module={module}
                            category={"capTable"}
                            handleGradeClick={props.handleGradeClick}
                            handleCheckboxChange={props.handleCheckboxChange}
                            isPast={status}
                            displayHeader={ i === 0 || nthFutureSem === 1}
                            gradeList={props.gradeList}/>
                    )
                } else {
                    return (
                        <TableContent
                            title={sem}
                            module={module}
                            category={category}/>
                    )
                }
            })
        } 

        }
    } 

     //Eg. Y2S1 => 3 (third sem)
    export const convertSemToNumber = (sem) => {
        if(sem.substr(7) === "Semester 1") {
            return sem.substr(5,1) * 2 - 1;
        } else {
            return sem.substr(5,1) * 2;
        }
    }

    //check if the semester chosen is in the past or future
    export const checkIsPast = (curr, user, currentSemester, month) => {
        const currSem = convertSemToNumber(curr);
        if (user > currSem) {
            return true;
        } else if (user === currSem) {
            if ((currentSemester === "Semester 1" && month === 12) 
                || (currentSemester === "Semester 2" && month >= 6)) {
                    return true;
            }
        } else {
            return false;
        }
    };