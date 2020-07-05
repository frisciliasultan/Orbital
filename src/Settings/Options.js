import React from "react";
import SubOptions from "./SubOptions";
import { generateOptions } from "../utils/commonFunctions";

const Options = (props) => {

    return (
        <div>
        <label>Your Faculty: {userInput.faculty}</label>
          <select
              name="faculty" 
              onChange={handleChange}
              value={userInput.faculty}>
                <option selected disabled>
                  Choose Your Faculty
                </option>
              {/* {!isEmpty(props.settings.userInfo) && generateOptions(props.settings.facultyOptions, "faculty")} */}
              {generateOptions(props.settings.facultyOptions, "test")}
            </select> 
        <div/>
    )
}