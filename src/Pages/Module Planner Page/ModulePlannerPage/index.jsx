import React, { useEffect, useState } from 'react';
import Board from '../Board';
import Rules from '../Rules';
import TrashBox from '../TrashBox';
import '../plannertemp.css';
import { Button, Card } from 'react-bootstrap';
import { Alert, Spin, message, notification, Modal } from "antd";
import { HTML5Backend as Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { connect } from 'react-redux';
import { callBackendAPI, setCallBackendNow, setSelectedModules, evalRules, setRules } from '../../../actions/modplanActions';
import { updateSettings, setFirstRender } from "../../../actions/settingsActions";
import { removeSuccess } from "../../../actions/successActions";
import { handleSaveClick, generateObject } from "../../../utils/commonFunctions";
import PropTypes from 'prop-types';
import isEmpty from 'is-empty'
import LoadingDots from '../../Loading Page/LoadingDots';
import { LoadingOutlined, ExclamationCircleOutlined } from '@ant-design/icons';


const { confirm } = Modal;

const ModulePlannerPage = (props) => {
    const module = props.modplan.modules;
    const [ruleFunction, setRuleFunction] = useState();
    const [alert, setAlert] = useState(false);
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    useEffect(() => {
        if(!isEmpty(props.settings.userInfo)) {
            if(isEmpty(props.modplan.rules)) {
                fetchRules();
            }

            if(!isEmpty(props.settings.userInfo.modPlan) && isEmpty(props.modplan.selectedModules)
                && props.settings.firstRender) {   
                props.setSelectedModules(null, props.settings.userInfo.modPlan);
                props.setFirstRender(false);
            }
        }
    }, [props.settings.userInfo])

    useEffect(() => {
        if(props.settings.userInfo) {
            fetchRules();
        }
    }, [props.settings.userInfo.major, props.settings.userInfo.specialisation, 
            props.settings.userInfo.secondMajors, props.settings.userInfo.minors,
            props.settings.userInfo.residential]);

    useEffect(() => {
        if(isEmpty(props.modplan.modules)){
            props.callBackendAPI('NUSMods', null, props.history);
        } 
    }, [])

    const fetchRules = async () => {
        const evalfunc = await props.callBackendAPI("Rules", props.settings.userInfo.modPlan, props.history);
        setRuleFunction(evalfunc);
    } 

    const openNotification = (type, placement) => {
        notification[type]({
          message: type === "success" ? "Evaluated" : "Whoops!",
          description:
            type === "success" ? "Check out your degree checklist!" : "Please add modules first!",
          placement,
        });
      };

    const handleEvalButtonClick = () => {
        const modules = props.modplan.selectedModules;
        if(!isEmpty(modules) && ruleFunction) {
            props.setCallBackendNow(true);
            const modplan = modules.map((obj) => {
                return obj.moduleCode
            });
            const asyncEvalRules = async () => {
                const newEvaluatedRules = await evalRules(ruleFunction, modplan);
                props.setRules(newEvaluatedRules);
            }
            asyncEvalRules();
            openNotification('success', "bottomRight" );
        } else {
            openNotification('warning', "bottomRight" );
            //     message.warning({
            //         content: 'Please add modules before evaluating',
            //       })

            //   message.config({
            //     maxCount: 1,
            //     duration: .7,
            //     top: '70px',
            //   })
        }
    }

    const handleDeleteAllButtonClick = () => {
        confirm({
            title: 'Are you sure to delete all modules?',
            icon: <ExclamationCircleOutlined />,
            content: 'Your module plan will be removed permanently',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                props.setSelectedModules(null, []);
                handleSaveClick(props, null, null, []);
            }
        });
    }

    return (
        props.auth.loading
            ? <LoadingDots/>
            : (<DndProvider backend={Backend} data-test="modulePlannerPageComponent">
                <div className="page-title">
                    <h3 id="module-planner-title">Module Planner</h3>
                </div>
                
                <div className="container-module-planner">
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
                    
                    <div className="button-group modplan-button-group">
                        <Button 
                            className="button modplan-button del-button" 
                            id="delete-all-button" 
                            onClick={handleDeleteAllButtonClick}>
                                Delete All
                        </Button>

                        <Button 
                            className="button modplan-button" 
                            id="eval-button" 
                            disabled={!ruleFunction}
                            onClick={() => handleEvalButtonClick()}>
                                Evaluate
                        </Button>

                        <div>
                        <Button 
                            className="button modplan-button"  
                            onClick={() => handleSaveClick(props)}>
                                Save
                        </Button>
                        <Spin indicator={antIcon} spinning={props.settings.isLoading}/>
                        </div>
                    </div>

                    {!isEmpty(props.success) && 
                        <Alert 
                            message={props.success} 
                            type="success" 
                            showIcon 
                            closable
                            style={{margin: "15px 0px"}} />
                    }
                    
                    {!isEmpty(props.success) && 
                        setTimeout(props.removeSuccess, 4000) &&
                        clearTimeout(setTimeout(props.removeSuccess, 2000))}

                    <p>Click on each requirement for further information</p>
                    <Card className="rule-container">
                        <Spin indicator={antIcon} tip="Loading..." spinning={props.modplan.loading}>
                            <div className="inner-rule-container">
                            <Card.Title className="card-title">Degree Requirements</Card.Title>
                                <Card.Body className="rule-card-body">
                                    <Rules
                                        rules={props.modplan.rules}
                                        settings={props.settings}
                                        ruleFunction={ruleFunction}/>      
                                </Card.Body>
                            </div>
                        </Spin>
                    </Card>
                </div>
            </DndProvider>)
    )
}

ModulePlannerPage.propTypes = {
    callBackendAPI: PropTypes.func.isRequired,
    setCallBackendNow: PropTypes.func.isRequired,
    updateSettings: PropTypes.func.isRequired,
    setFirstRender: PropTypes.func.isRequired,
    setSelectedModules: PropTypes.func.isRequired,
    removeSuccess: PropTypes.func.isRequired,
    setRules: PropTypes.func.isRequired,
    modplan: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    cap: PropTypes.object.isRequired,
    success: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    settings: state.settings,
    cap: state.cap,
    modplan: state.modplan,
    success: state.success,
    auth: state.auth
});

export default connect(mapStateToProps, 
                    { callBackendAPI, setCallBackendNow, updateSettings, setFirstRender,
                        setSelectedModules, removeSuccess, setRules  }) 
                    (ModulePlannerPage);
