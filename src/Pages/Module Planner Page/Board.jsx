import React, { useState, useEffect } from "react";
import AutoCompleteText from './AutocompleteText';
import AutoCompleteInput from './AutoCompleteInput';
import { Card, Button } from 'react-bootstrap';
import ModuleCard from './Card';
import { ItemTypes } from './itemType';
import { useDrop } from 'react-dnd';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setModuleLocation } from "../../actions/modplanActions";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from "antd";

const { confirm } = Modal;

function Board (props) {
    const [isBoardFilled, setIsBoardFilled] = useState(false);
    const [isTextBoxOpen, setIsTextBoxOpen] = useState(false);
    const selectedModules = props.modplan.selectedModules;
    const thisSemesterModule = selectedModules.filter((object, i) => object.location === props.id);
    let totalMCs = 0;
    
    useEffect(() => { 
            updateIsBoardFilled();
    }, [selectedModules])
        
    const generateCards = selectedModules
        .filter((object, i) => object.location === props.id)
        .map((object, i) => {
                totalMCs += Number(object.moduleCredit)
                return (<ModuleCard
                    id={object.moduleCode}
                    location={props.id}
                    title={`${object.moduleCode}: ${object.title}`}
                    MCs={object.moduleCredit}
                    del={props.setModuleLocation}
                    selectedModules={props.modplan.selectedModules}/>)});

    const [{ isOver }, drop] = useDrop({
            accept: ItemTypes.CARD,
            drop: (item) => props.setModuleLocation(item, props.id, props.AY, selectedModules),
            collect: monitor => ({
                isOver: !!monitor.isOver(),
            }),
    })

    function handleAddButtonClick() {
        setIsTextBoxOpen(!isTextBoxOpen);
    }
    
    function handleDeleteButtonClick () {
        confirm({
            title: 'Are you sure to delete modules for this semester?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                setIsBoardFilled(false);
                setIsTextBoxOpen(false);
                if(thisSemesterModule) {
                    props.setModuleLocation(thisSemesterModule, null, null, selectedModules)
                }
            }
        });
    }

    function updateIsBoardFilled() {
        if(selectedModules && thisSemesterModule.length > 0) {
            setIsBoardFilled(true);
            
        } else {
            setIsBoardFilled(false);
        }
    }
    
        return (
            
            <div className="card-board">
                <h3>{props.semester}</h3>
            <div   
                ref={drop}
                id={props.id}
                style={{width: '250px'}}
            >

            <div className="" style={{width: '250px', 
                        height: (!isBoardFilled) && '59px', 
                        outline: isBoardFilled ? 'none' : '1px dotted'}}>
                            {isBoardFilled ? generateCards : 'Drop module here'}
            </div>

            {isTextBoxOpen && <AutoCompleteInput
                                            AY={props.AY}
                                            location={props.id}
                                            category="module"
                                            module={props.module}/>}
            
                <button className="button modplan-button" id="addModule" onClick={handleAddButtonClick}>Add Module</button>
                
                {isBoardFilled && (
                    <button 
                        className="button modplan-button del-button"
                        onClick={handleDeleteButtonClick}>
                        Delete Semester
                    </button>
                )}

                <h5>Total MCs: {totalMCs}</h5>
                
                </div>
            </div>
        )
   
}

Board.propType = {
    modplan: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    modplan: state.modplan
});

export default connect(mapStateToProps, { setModuleLocation }) (Board);

