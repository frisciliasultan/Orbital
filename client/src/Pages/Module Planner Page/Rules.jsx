import React from 'react';
import { Card, Spinner, Button } from 'react-bootstrap';
import Subrules from './Subrules';

class Rules extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                        isLoading: false,
                     }
        this.generateRules = this.generateRules.bind(this);
    }

    generateRules() {
        let rule = this.props.rules;

        if(!Array.isArray(rule)) {
            rule = [rule];   
        } 

        return (
            <div>
                {   
                    rule.map(rule => (
                                        <ul>
                                            <Subrules
                                                ruleName={rule.name}
                                                ruleTag={rule.tag}
                                                callBackendNow={this.props.callBackendNow}/>
                                            
                                            {(rule.sub && 
                                                <Rules
                                                    rules={rule.sub}
                                                    callBackendNow={this.props.callBackendNow}
                                                    modulesSelected={this.props.modulesSelected}/>)}
                                        </ul>
                                    )
                            )
                }
            </div>
        )
    }

    render() {
        return (
            <div>
            <br/>
            {this.generateRules()}
            </div>
        )
    }
}

export default Rules;
