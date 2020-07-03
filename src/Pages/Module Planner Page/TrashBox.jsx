import React from 'react';
import { Card } from 'react-bootstrap';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './itemType';
import { setModuleLocation } from '../../actions/modplanActions';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

function TrashBox (props) {

    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.CARD,
        drop: (item) => props.setModuleLocation(item, null, null, props.modplan.selectedModules),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    })

    return (
        <Card 
            ref={drop}
            style={{width: '300px',
                    height: '400px'}}>
            <Card.Title>Trash</Card.Title>
            <Card.Subtitle>Drop Modules here to delete</Card.Subtitle>
        </Card>
    )
}

TrashBox.propType = {
    setModuleLocation: PropTypes.func.isRequired,
    modplan: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    modplan: state.modplan
});

export default connect(mapStateToProps, { setModuleLocation }) (TrashBox);