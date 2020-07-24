import React from "react";
import { Select } from "antd";
import { TableContent } from "../Pages/Module Selection Page/Table Content";
import  YearDisplay  from "../Pages/Module Planner Page/YearDisplay";
import isEmpty from "is-empty";

const { Option } = Select;

export const generateOptions = (optionList, category, object) => {
    if(!isEmpty(optionList)) {
        if(category === "grade") {
            return optionList.map((option) => {
                return (
                    <Option value={option.grade} object={object}>
                    {option.grade}
                    </Option>
                );
            })

        //DO NOT DELETE CATEGORY. Need diff category names for saving input
        } else if (category === 'major' || category === "secondMajors" || category === "minors" 
                        || category === "residence" 
                        ) {
            return optionList.map((option, index) => {
                    if(option) {
                        if(!isEmpty(option.options)) {
                            return (
                                <Option 
                                    key={option.fullName} 
                                    value={option.fullName}
                                    name={category}
                                    tag={option.tag}
                                    honours={option.options.honours}
                                    specialisation={option.options.specialisation}
                                    selectedindex={index}>
                                    {option.name}
                                </Option>
                            );
                        } else {
                            
                            return (
                                <Option 
                                    key={option.fullName} 
                                    value={option.fullName}
                                    name={category}
                                    tag={option.tag}
                                    selectedindex={index}>
                                    {option.name}
                                </Option>
                            );
                        }
                    }
            })
        } else if (category === 'matriculationYear') {
            let isDisabled = false;
            return optionList.map((option) => {
                if(object) {
                    if(option.substr(3,4) > object.substr(0,4)) {
                        isDisabled = true;
                    } else {
                        isDisabled = false;
                    }
                }

                return (
                    <Option 
                        key={option.substr(3,9)} 
                        value={option.substr(3,9)}
                        disabled={isDisabled}
                        name={category}>
                    {option}
                    </Option>
                );
            })
        } else if (category === 'targetGradYear') {
            let isDisabled = false;

            return optionList.map((option) => {
                if(object) {
                    if(option.substr(6,4) >= object.substr(0,4)) {
                        isDisabled = false;
                    } else {
                        isDisabled = true;
                    }
                } 

                return (
                    <Option 
                        key={option.substr(6,9)} 
                        value={option.substr(6,9)}
                        name={category}
                        disabled={isDisabled}>
                    {option}
                    </Option>
                );
            })
        } 
    
        return optionList.map((option, i) => {
            return (
                <Option key={option} value={option} name={category} index={i}>
                {option}
                </Option>
            );
        });
    }
}

export const handleSaveClick = (props, data, editCategory) => {
    const userData = {
        name: data ? data.name : props.auth.user.name,
        email: data ? data.email : props.auth.user.email,
        modPlan: props.modplan.selectedModules,
        residential: props.settings.userInfo.residential,
        major: props.settings.userInfo.major,
        majorIndex: props.settings.userInfo.majorIndex,
        specialisation: props.settings.userInfo.specialisation,
        secondMajors: props.settings.userInfo.secondMajors,
        minors: props.settings.userInfo.minors,
        matriculationYear: props.settings.userInfo.matriculationYear,
        targetGradYear: props.settings.userInfo.targetGradYear,
        cap: props.cap.cap,
        targetCap: props.cap.targetCap
    }

    props.updateSettings(userData, props.history, props.isEditing, editCategory);
}

// generate Year Cards in Module Planner Page / Tables in Mod Info Page
export const generateObject = (matriYear, gradYear, category, module, props) => {

    if(matriYear && gradYear) {
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
                        if(props.userSemester || props.userSemester === 0) {
                            const status = checkIsPast(sem, props.userSemester, props.currentSemester, props.month);
                            let nextStatus = true;
                            if(status && (i + 1 < display.length)) {
                                nextStatus = checkIsPast(display[i + 1], props.userSemester, props.currentSemester, props.month)
                            }

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
                                    lastInCategory={i === (display.length - 1) || (status && !nextStatus)}
                                    gradeList={props.gradeList}/>
                            )
                        } else {
                            return null;
                        }
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


  //Check if there is any part of userData that is undefined/falsy
  export const checkSubmission = (userData) => {
    const keys = Object.keys(userData);
    let status;
    console.log(keys)
    console.log(userData)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      status = (userData[key] || userData[key] === 0) ? true : false;
     console.log(userData.name)
     console.log(key)
      console.log(status)
     console.log(userData[key])
      if(!status) {
        return status = false;
      }
    }

    return status;
  }