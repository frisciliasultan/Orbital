import React from "react";
import YearDisplay from './YearDisplay';
import { Table } from './Module Table';

// To generate dropdown options in settings page and CAP Calc page
export const generateOptions = (optionList, category) => {
    // let value;

    // if(category === 'grade') {
    //     value = option.grade;
    // }
    if(category === "grade") {
        return optionList.map((option) => {
            return (
                <option value={option.grade}>
                {option.grade}
                </option>
            );
        })
    } else if (category === 'faculty') {
            return optionList.map((option) => {
                return (
                    <option value={option.name}>
                    {option.name}
                    </option>
                );
            })
    } else if (category === 'residence') {
        return optionList.map((option) => {
            return (
                <option value={option.fullName}>
                {option.fullName}
                </option>
            );
        })
}

    return optionList.map((option) => {
        return (
            <option value={option}>
            {option}
            </option>
        );
    });
}

// To update user settings
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
export const generateObject = (matriYear, gradYear, category) => {
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
                return (
                        <Table
                            title={sem} />
                )
            })
        }
    } 
}