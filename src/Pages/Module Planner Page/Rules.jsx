import React from 'react';
import { Card, Spinner, Button } from 'react-bootstrap';
import Subrules from './Subrules';

class Rules extends React.Component {
    constructor(props) {
        super(props);
        
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
                                                ruleDesc= {rule.desc}
                                                callBackendNow={this.props.callBackendNow}
                                                selectedModules={this.props.selectedModules}
                                                updateCallBackendNow={this.props.updateCallBackendNow}/>
                                            
                                            {(rule.sub && 
                                                <Rules
                                                    rules={rule.sub}
                                                    callBackendNow={this.props.callBackendNow}
                                                    selectedModules={this.props.selectedModules}
                                                    updateCallBackendNow={this.props.updateCallBackendNow}/>)}
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
                {this.generateRules()}
            </div>
        )
    }
}

export default Rules;
