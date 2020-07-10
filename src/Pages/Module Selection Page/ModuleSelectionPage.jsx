import React, { useEffect } from "react";
import { Dropdown } from './Dropdown';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import isEmpty from "is-empty";
import { setSelectedModules } from "../../actions/modplanActions";
import { generateObject } from "../../utils/commonFunctions";
import LoadingDots from "../Loading Page/LoadingPage";

let totalGEMMCs = 0;

export const ModuleSelectionPage = (props) => {
  useEffect(() => {
    if(!isEmpty(props.settings.userInfo.modPlan) && isEmpty(props.modplan.selectedModules)) {
        props.setSelectedModules(null, props.settings.userInfo.modPlan)
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
            : (<div className="full-container">
            {generateObject(props.settings.userInfo.matriculationYear, 
                              props.settings.userInfo.targetGradYear,
                              "tables", props.modplan.selectedModules)}
            {/* <div className="row">
              <h1 className="display-3 ml-4">
                Module Information
              </h1>
            </div>
      
            <div className="row"> 
      
            <div className="col-lg col-md-4 col-sm-6">
              <Table
                    title="Year 1 Semester 1"
                    module={makeTable('y1s1')} />
            </div>
      
            <div className="col-lg col-md-4 col-sm-6">
              <Table
                    title="Year 1 Semester 2"
                    module={makeTable('y1s2')} />
            </div>
      
            <div className="col-lg col-md-4 col-sm-6">
              <Table
                    title="Year 2 Semester 1"
                    module={makeTable('y2s1')} />
            </div>
      
            <div className="col-lg col-md-4 col-sm-6">
              <Table
                    title="Year 2 Semester 2"
                    module={makeTable('y2s2')} />
            </div>
      
            </div>
      
      
            <div className="row"> 
              <div className="col-lg col-md-4 col-sm-6">
                <Table
                      title="Year 3 Semester 1"
                      module={makeTable('y3s1')} />
              </div>
      
              <div className="col-lg col-md-4 col-sm-6">
                <Table
                      title="Year 3 Semester 2"
                      module={makeTable('y3s2')} />
              </div>
      
      
                
              <div className="col-lg col-md-4 col-sm-6">
                <Table
                      title="Year 4 Semester 1"
                      module={makeTable('y4s1')} />
              </div>
      
              <div className="col-lg col-md-4 col-sm-6">
                <Table
                      title="Year 4 Semester 2"
                      module={makeTable('y4s2')} />
              </div>
            
            </div> */}
        </div>)
  )
}

ModuleSelectionPage.propTypes = {
  setSelectedModules: PropTypes.func.isRequired,
  modplan: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  modplan: state.modplan,
  settings: state.settings
});

export default connect(mapStateToProps, { setSelectedModules }) (ModuleSelectionPage);