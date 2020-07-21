import React from 'react';
import Subrules from './Subrules';

class Rules extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: false}
        this.generateRules = this.generateRules.bind(this);
    }

    generateRules() {
        const rule = this.props.rules;
        // if(!Array.isArray(rule)) {
        //     rule = [rule];   
        // } 
        // console.log(rule)
        return (
            <div>
                {   
                    rule.map(rule => (
                                        <ul>
                                        {rule && (
                                             <Subrules
                                             // setState={this.setState}
                                             rule={rule}
                                            //  ruleName={rule.name}
                                            //  ruleTag={rule.tag}
                                            //  ruleDesc= {rule.desc}
                                             ruleEvaluation={rule.evaluation}
                                             callBackendNow={this.props.callBackendNow}
                                             selectedModules={this.props.selectedModules}
                                             updateCallBackendNow={this.props.updateCallBackendNow}/>
                                        )}

                                        {rule && rule.sub && rule.name !== "University Level Requirements" && (
                                                <Rules
                                                    rules={rule.sub}
                                                    callBackendNow={this.props.callBackendNow}
                                                    selectedModules={this.props.selectedModules}
                                                    updateCallBackendNow={this.props.updateCallBackendNow}/>
                                            )
                                        }
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
