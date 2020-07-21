import React , { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import Board from './Board';

function YearDisplay(props) {
    return (
        <Card className="container year-card">
            <Card.Title>{props.year}</Card.Title>
            <Card.Subtitle>{props.AY}</Card.Subtitle>
            <Card.Body>
                        <Board 
                                id={props.year + " " + "Semester 1"}
                                AY={props.AY}
                                className="board"
                                semester="Semester 1"
                                module={props.module}>
                            
                        </Board>

                        <Board 
                                id={props.year + " " + "Semester 2"}
                                AY={props.AY}
                                className="board"
                                semester="Semester 2"
                                module={props.module}>
                            
                        </Board>
            </Card.Body>
        </Card>
    )
}

export default YearDisplay;