import React from 'react';
import { Button } from 'react-bootstrap';
import { ItemTypes } from './itemType';
import { useDrag } from 'react-dnd';
import { message } from "antd";

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
    
    let timer;
    const handleClick = () => {
        if(timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            console.log('called')
            message.warning({
                content: 'Double click to delete',
              })
      
              message.config({
                maxCount: 1,
                duration: .7,
                top: '70px',
              })
        }, 250)
    }

    const handleDoubleClick = () => {
        clearTimeout(timer);
        props.del({id: props.id}, null, null, props.selectedModules);
    }

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
                onClick={handleClick} 
                onDoubleClick={handleDoubleClick} />
                </div>
            </div>
        </Button>
    )
}

export default ModuleCard;