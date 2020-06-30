import React from "react";

export const generateOptions = (optionList, category) => {
    if(category === "grade") {
        return optionList.map((option) => {
            return (
                <option value={option.grade}>
                {option.grade}
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