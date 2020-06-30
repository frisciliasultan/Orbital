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

    handleTextChange (e) {
        const value = e.target.value;
        let suggestions = [];
        const module = this.props.module;
        
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');

            for(let i = 0; i < module.length; i++) {
                const moduleCode = module[i].moduleCode
                if(regex.test(moduleCode)) {
                    suggestions.push(module[i]);
                }
            }

        }
        this.setState(() => ({ suggestions, text: value }));
    }

    handleListClick(object) {
        const module = {...object};
        module.location = this.props.location;
        module.AY = this.props.AY
        this.props.setSelectedModules(module, this.props.modplan.selectedModules)
        this.setState(() => ({suggestions: []})) 
    }

    renderSuggestions () {
        const { suggestions } = this.state;
        if (suggestions.length === 0) {
            return null;
        }
        return (
            <ul>
                {suggestions.map((object) => <li onClick={() => this.handleListClick(object)}>{`${object.moduleCode}: ${object.title}`}</li>)}
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
    modplan: state.modplan
});

export default connect(mapStateToProps, { setSelectedModules })(AutoCompleteText);