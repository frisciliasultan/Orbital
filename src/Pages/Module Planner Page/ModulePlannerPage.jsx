import React, { useEffect, useState } from 'react';
import Board from './Board';
import Rules from './Rules';
import TrashBox from './TrashBox';
import './plannertemp.css';
import { Button, Card } from 'react-bootstrap';
import { Alert } from "antd";
import { HTML5Backend as Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { connect } from 'react-redux';
import { callBackendAPI, setCallBackendNow, setSelectedModules } from '../../actions/modplanActions';
import { updateSettings, initialSettings } from "../../actions/settingsActions";
import { removeSuccess } from "../../actions/successActions";
import { handleSaveClick, generateObject } from "../../utils/commonFunctions";
import PropTypes from 'prop-types';
import isEmpty from 'is-empty'
import LoadingDots from '../Loading Page/LoadingDots';


const ModulePlannerPageTemp = (props) => {
    const module = props.modplan.modules;

    useEffect(() => {
        if(isEmpty(props.modplan.rules)) {
            props.callBackendAPI('Rules', "r_ulr", "r_cs_degree");
        }
        
        if(isEmpty(props.modplan.modules)){
            props.callBackendAPI('NUSMods');
        } 
    }, [])

    useEffect(() => {
            if(!isEmpty(props.settings.userInfo.modPlan) && isEmpty(props.modplan.selectedModules)) {
                console.log(props.modplan.selectedModules)
                props.setSelectedModules(null, props.settings.userInfo.modPlan)
            }
    }, [props.settings.userInfo])

    const handleEvalButtonClick = () => {
        const modules = props.modplan.selectedModules;
        if (isEmpty(modules)) {
            return (
                <Alert 
                    message='Please add modules before evaluating' 
                    type="warning" 
                    showIcon 
                    closable
                    style={{margin: "15px 0px"}} />
            )
        } else {
            props.setCallBackendNow(true);
        }
    }

    return (
        isEmpty(props.settings.userInfo) 
            ? <LoadingDots/>
            : (<DndProvider backend={Backend} >
                <div className="container-module-planner">
                    <h3 id="module-planner-title">Module Planner</h3>
                    <div className="year-display">
                    {!isEmpty(props.settings.userInfo.matriculationYear) 
                        && generateObject(props.settings.userInfo.matriculationYear, 
                                props.settings.userInfo.targetGradYear, 
                                "yearDisplay",
                                module
                                )}
                    </div>
                    
                    <TrashBox
                            module={module}/>
    
    
                    <br/>
    
                    <Button className="button" id="eval-button" onClick={() => handleEvalButtonClick()}>Evaluate</Button>
    
                    <Button className="button" onClick={() => handleSaveClick(props)} >Save</Button>
                    
                    {!isEmpty(props.success) && 
                        <Alert 
                            message={props.success} 
                            type="success" 
                            showIcon 
                            closable
                            style={{margin: "15px 0px"}} />
                    }
                    
                    {!isEmpty(props.success) && 
                        setTimeout(props.removeSuccess, 2000) &&
                        clearTimeout(setTimeout(props.removeSuccess, 2000))}
                    <br/>
                    <br/>
                    <p>Click on each requirement for further information</p>
                    <Card>
                        <Rules
                            rules={props.modplan.rules}
                            settings={props.settings}/>
                    </Card>
                    <br/>
                </div>
            </DndProvider>)
    )
}

ModulePlannerPageTemp.propTypes = {
    callBackendAPI: PropTypes.func.isRequired,
    setCallBackendNow: PropTypes.func.isRequired,
    updateSettings: PropTypes.func.isRequired,
    removeSuccess: PropTypes.func.isRequired,
    handleSaveClick: PropTypes.func.isRequired,
    
    modplan: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    cap: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    settings: state.settings,
    cap: state.cap,
    modplan: state.modplan,
    success: state.success,
});

export default connect(mapStateToProps, 
                    { callBackendAPI, setCallBackendNow, updateSettings, initialSettings, setSelectedModules, removeSuccess }) 
                    (ModulePlannerPageTemp);
