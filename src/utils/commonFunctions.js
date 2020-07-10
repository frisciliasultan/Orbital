import React from "react";
import { Select } from "antd";
import { Table } from "../Pages/Module Selection Page/Module Table";
import  YearDisplay  from "../Pages/Module Planner Page/YearDisplay";

const { Option } = Select;

export const generateOptions = (optionList, category) => {
    if(optionList) {
        if(category === "grade") {
            return optionList.map((option) => {
                return (
                    <option value={option.grade}>
                    {option.grade}
                    </option>
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
    
        return optionList.map((option) => {
            console.log('called')
            return (
                <Option key={option} value={option}>
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
export const generateObject = (matriYear, gradYear, category, module) => {
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
        } else {
            return display.map((sem) => {
                console.log(module + "hi")
                return (
                        <Table
                            title={sem}
                            module={module} />
                )
            })
        }
    } 
}