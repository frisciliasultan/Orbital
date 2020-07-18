import React, { useEffect } from "react";
import { Dropdown } from './Dropdown';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import isEmpty from "is-empty";
import { setSelectedModules } from "../../actions/modplanActions";
import { generateObject } from "../../utils/commonFunctions";
import { setFirstRender } from "../../actions/settingsActions";
import LoadingDots from "../Loading Page/LoadingDots";

let totalGEMMCs = 0;

export const ModuleSelectionPage = (props) => {
  useEffect(() => {
    if(!isEmpty(props.settings.userInfo.modPlan) && isEmpty(props.modplan.selectedModules)
        && props.settings.firstRender) {
        props.setSelectedModules(null, props.settings.userInfo.modPlan);
        props.setFirstRender(false);
    }
  }, [props.settings.userInfo])
    
  const handleClick = (code, name, MCs, moduleCat) => {
        const title = code + ': ' + name;
        this.setState({GEMTitle: title,
                       MCTemp: MCs,
                        moduleCat: moduleCat});
      }
    
  const countModule = () => {
        const GEMs = this.state.totalGEMMCs;
        const coreModules = this.state.dummymodules[1].coreModules.reduce((currentTotal, next) => {
          return currentTotal + next.MCs} , 0);
        const specialisationModules = this.state.dummymodules[2].specialisationModules.reduce((currentTotal, next) => {
          return currentTotal + next.MCs} , 0);
        const unrestrictedModules = this.state.dummymodules[3].unrestrictedModules.reduce((currentTotal, next) => {
          return currentTotal + next.MCs} , 0);
        const grandTotal = GEMs + coreModules + specialisationModules + unrestrictedModules;
          this.setState({summary: [{cat: "General Elective Module",
                                   MCs: GEMs},
                                  {cat: "Core Module",
                                   MCs: coreModules},
                                  {cat: "Specialisation Module",
                                   MCs: specialisationModules},
                                  {cat: "Unrestricted Module",
                                   MCs: unrestrictedModules}],
                        grandTotal: grandTotal
                                  });
          
        }
    
      // takes in array of objects for modules and return a table
  

  return (
    isEmpty(props.settings.userInfo) || isEmpty(props.settings.userInfo.matriculationYear) 
            ? <LoadingDots/>
            : (
                <div className="full-container">
                  <div className="page-title">
                      <h3 id="module-planner-title">Module Information</h3>
                  </div>
                  {generateObject(props.settings.userInfo.matriculationYear, 
                              props.settings.userInfo.targetGradYear,
                              "tables", props.modplan.selectedModules)}
                </div>)
  )
}

ModuleSelectionPage.propTypes = {
  setSelectedModules: PropTypes.func.isRequired,
  setFirstRender: PropTypes.func.isRequired,
  modplan: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  modplan: state.modplan,
  settings: state.settings
});

export default connect(mapStateToProps, { setSelectedModules, setFirstRender }) (ModuleSelectionPage);