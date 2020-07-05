import React from "react";
import SubOptions from "./SubOptions";

const Options = (props) => {
    const generateRecursiveOptions = () => {
        return optionList.map((option) => {
            return (
                <div>
                    <SubOptions 
                        name={option.id ? "faculty" : "major"}
                        label={option.id ? "Your Faculty" : "Your Degree"}
                        value={faculty}
                        />

                    {(option.name === faculty && option.majors)}

                    <Options 
                        optionList={option.undergraduate.degrees}
                        />
                    
                </div>
            );
        })
    }
    return (
        <div>
        {generateRecursiveOptions()}
        </div>
    )
}

export default Options;