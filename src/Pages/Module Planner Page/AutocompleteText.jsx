import React from 'react';
import "./AutocompleteText.css";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { setSelectedModules } from "../../actions/modplanActions";

class AutoCompleteText extends React.Component {
    constructor (props) {
        super(props);
        this.state = { suggestions: [],
                       text: '',

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
        } else if (category === "major") {
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
                } else if(category === "major") {
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
            this.setState(() => ({suggestions: []})) 
        } else {
            
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

                <div className="AutoCompleteText">
                    <input 
                        className="autocomplete-input"
                        value={text}
                        onChange={this.handleTextChange}
                        type="text"
                        placeholder="Enter module code" />
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