import React, { useState, useEffect } from "react";
import AutoCompleteText from './AutocompleteText';
import { Card, Button } from 'react-bootstrap';
import ModuleCard from './Card';
import { ItemTypes } from './itemType';
import { useDrop } from 'react-dnd';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setModuleLocation } from "../../actions/modplanActions";



function Board (props) {
    const [isBoardFilled, setIsBoardFilled] = useState(false);
    const [isTextBoxOpen, setIsTextBoxOpen] = useState(false);
    const selectedModules = props.modplan.selectedModules;
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

    function handleButtonClick() {
        setIsTextBoxOpen(!isTextBoxOpen);
     }

    function updateIsBoardFilled() {
        if(selectedModules && selectedModules.filter((object, i) => object.location === props.id).length > 0) {
            setIsBoardFilled(true);
            
        } else {
            setIsBoardFilled(false);
        }
    }
 

        return (
            
            <div>
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
            {isTextBoxOpen && <AutoCompleteText 
                                            AY={props.AY}
                                            location={props.id}
                                            module={props.module}/>}
                <Button className="button" id="addModule" onClick={handleButtonClick}>Add Module</Button>
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

