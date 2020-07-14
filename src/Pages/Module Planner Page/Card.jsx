import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { ItemTypes } from './itemType';
import { useDrag } from 'react-dnd';

const ModuleCard = props => {
    const [{ isDragging}, drag] = useDrag({
        item: {
            type: ItemTypes.CARD,
            id: props.id,
        },
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        })
    })
   
    return (
        <Button
            ref={drag}
            id={props.id}
            className="button"
            id="module-card"
            style={{
                width: '250px',
                opacity: isDragging ? 0 : 1,
                cursor: isDragging ? 'grabbing' : 'grab'}}
        >
            <div className="row">
                <div className="col-9">
                <span>{props.title}</span>
                <br/>
                <span>{props.MCs + ' MCs'}</span>
                </div>
                <div className="col-3">
                <i  
                class="fa fa-trash-alt fa-border"
                id="mod-plan-trash"
                onClick={() => {}} 
                onDoubleClick={() => props.del({id: props.id}, null, null, props.selectedModules)} />
                </div>
            </div>
            {/* <span>{props.title}</span>
                <br/>
            <span>{props.MCs + ' MCs'}</span>
            <br />
            <i  
                class="fa fa-trash-alt"
                style={{cursor: "pointer"}}
                onClick={() => {}} 
                onDoubleClick={() => props.del({id: props.id}, null, null, props.selectedModules)} /> */}
        </Button>
    )
}

export default ModuleCard;