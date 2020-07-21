import React from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { setSelectedModules } from "../../actions/modplanActions";

class AutoCompleteText extends React.Component {
    constructor (props) {
        super(props);
        this.state = { suggestions: [],
                       text: this.props.value
                       ? this.props.value[this.props.index] 
                       : '',
                     };
        this.handleTextChange = this.handleTextChange.bind(this);
        this.renderSuggestions = this.renderSuggestions.bind(this);
        this.suggestionsSelected = this.suggestionsSelected.bind(this);
        this.handleListClick = this.handleListClick.bind(this);
    }

    

    //Set suggestions that match the user's input
    handleTextChange (e) {
        const value = e.target.value;
        const category = this.props.category;
        let suggestions = [];
        let dataPool = [];
        // let i = 0;
        // let toCompare;

        if(category === "module") {
            dataPool = this.props.module;
            // toCompare = dataPool[i].moduleCode;
        } else if (category === "secondMajor") {
            this.props.facultyOptions.map((obj) => {
                //TEMPORARY UNTIL DEGREES ARE OUT
                if(obj.undergraduate) {
                    obj.undergraduate.secondMajors.map((object) => {
                        dataPool.push(object);
                    });
                } 
            });
            // toCompare = dataPool[i].name;
        } else if (category === "minor") {
            this.props.facultyOptions.map((obj) => {
                //TEMPORARY UNTIL DEGREES ARE OUT
                if(obj.undergraduate) {
                    obj.undergraduate.minors.map((object) => {
                        dataPool.push(object);
                    });
                } 
            });
            // toCompare = dataPool[i].name;
        }

        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            let toCompare;
            for(let i = 0; i < dataPool.length; i++) {
                if(category === "module") {
                    toCompare = dataPool[i].moduleCode;
                } else if(category === "secondMajor") {
                    toCompare = dataPool[i].name;
                } else if (category === "minor") {
                    toCompare = dataPool[i].name;
                }

                if(regex.test(toCompare)) {
                    suggestions.push(dataPool[i]);
                }
                
            }

        }
        this.setState(() => ({ suggestions, text: value }));
    }

    //Add the clicked suggestion to modplan
    handleListClick(object) {
        const category = this.props.category;

        if(category === "module") {
            const module = {...object};
            module.location = this.props.location;
            module.AY = this.props.AY
            this.props.setSelectedModules(module, this.props.modplan.selectedModules)
            this.suggestionsSelected('');
            this.setState(() => ({suggestions: []})) 
        } else {
            const original = this.props.value ? [...this.props.value] : [];
            original[this.props.index] = object.fullName;
            this.props.setUserInput({[category]: original});
            this.suggestionsSelected(object.fullName);
            this.setState(() => ({suggestions: []})) 
        }
    }

    //Display the suggestions 
    renderSuggestions () {
        const category = this.props.category;
        const { suggestions } = this.state;
        if (suggestions.length === 0) {
            return null;
        }
        return (
            <ul>
                {suggestions.map((object) => {
                    let toDisplay;
                    if(category === "module") {
                        toDisplay = `${object.moduleCode}: ${object.title}`;
                    } else {
                        toDisplay = object.name;
                    }

                    return (
                        <li onClick={() => this.handleListClick(object)}>
                            {toDisplay}
                        </li>
                    )
                })}
            </ul>   
        );
    }

    suggestionsSelected (value) {
        this.setState(() => ({
            text: value,
            suggestions: [],
        }))
    }

    render () {
        const { text } = this.state;
        return (
            
                <div className="AutoCompleteText" >
                    <Input 
                        className="autocomplete-input" id={this.props.id ? this.props.id : this.props.category}
                        value={text}
                        onChange={this.handleTextChange}
                        type="text"
                        autoComplete="off"
                        placeholder={this.props.category === "module" 
                            ? "Enter module code" 
                            : `Enter ${this.props.category === "secondMajor" ? "Major" : "Minor"}`}/>
                    {this.renderSuggestions()}
                
                </div>

        )
    }
}

AutoCompleteText.propTypes = {
    setSelectedModules: PropTypes.func.isRequired,
    modplan: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    modplan: state.modplan,
    facultyOptions: state.settings.facultyOptions
});

export default connect(mapStateToProps, { setSelectedModules })(AutoCompleteText);