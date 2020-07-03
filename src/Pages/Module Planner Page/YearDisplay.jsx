import React , { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import Board from './Board';

function YearDisplay(props) {
    return (
        <div className="year-display">

        <Card style={{width: '600px'}}>
            <Card.Title>{props.year}</Card.Title>
            <Card.Subtitle>{props.AY}</Card.Subtitle>
            <Card.Body>
                <div className="row">
                    <div className="col">
                        <Board 
                                id={props.year + " " + "Semester 1"}
                                AY={props.AY}
                                className="board"
                                semester="Semester 1"
                                module={props.module}>
                            
                        </Board>
                    </div>

                    <div className="col">
                        <Board 
                                id={props.year + " " + "Semester 2"}
                                AY={props.AY}
                                className="board"
                                semester="Semester 2"
                                module={props.module}>
                            
                        </Board>
                    </div>
                </div>

            </Card.Body>
        </Card>
        </div>
    )
}

export default YearDisplay;