import React, { useState } from 'react';
import { AutoComplete, Input } from 'antd';
import { setSelectedModules } from '../../actions/modplanActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'is-empty';

const { TextArea } = Input;

const AutoCompleteInput = (props) => {
  const [suggestions, setSuggestions] = useState([]);
  const [multipleInput, setMultipleInput] = useState([]);
  const [text, setText] = useState('');

  const handleSearch = value => {
    if(value.length > 0) {
      if(value.indexOf("\n") !== -1) {
        let multipleInputTemp = [];
        const line = value.split("\n");

        line.map((str, i) => {
          for(let i = 0; i < props.module.length; i++) {
            const object = {...props.module[i]};
            if(str.toUpperCase() === object.moduleCode.toUpperCase() || str.toUpperCase() === object.title.toUpperCase()) {
              const { title, moduleCode, moduleCredit, prerequisite, preclusion, semesterData } = object;
              const module = {
                title, 
                moduleCode, 
                moduleCredit, 
                prerequisite, 
                preclusion, 
                semesterData,
                location: props.location,
                AY: props.AY
              };
              multipleInputTemp.push(module);
              break;
            } 
          }
        });
  
        setMultipleInput(multipleInputTemp);

      } else {
        let moduleCodeMatch = [];
        let titleMatch = [];
        const regex = new RegExp(`\\b${value}`, 'i');
        for(let i = 0; i < props.module.length; i++) {
          const module = {...props.module[i]};
          if(regex.test(module.moduleCode)) {
            module.value = `${module.moduleCode}: ${module.title}`;
            moduleCodeMatch.push(module);
          } else if (regex.test(module.title)) {
            module.value = `${module.moduleCode}: ${module.title}`;
            titleMatch.push(module);
          } 
        }
        setSuggestions(moduleCodeMatch.concat(titleMatch));
      }
    } else {
      setSuggestions([]);
    }
      setText(value);
  };

  const handleKeyPress = ev => {
    if(ev.key === 'Enter') {
      ev.preventDefault();
      if(!isEmpty(multipleInput)) {
     
        props.setSelectedModules(multipleInput, props.modplan.selectedModules);
        setText('');
        setMultipleInput([]);
        setSuggestions([]);
      } else if(suggestions.length === 1) {
        onSelect(suggestions[0]);
        setText('');
        setSuggestions([]);
        setMultipleInput([]);
      }
    }
  };

  const onSelect = object => {
    const { title, moduleCode, moduleCredit, prerequisite, preclusion, semesterData, attributes } = object;
    const module = {
      title, 
      moduleCode, 
      moduleCredit, 
      prerequisite, 
      preclusion, 
      semesterData,
      attributes,
      location: props.location,
      AY: props.AY
    };
    props.setSelectedModules(module, props.modplan.selectedModules);
    setSuggestions([]);
    setText('');
  };

  return (
    <div>
    <AutoComplete
      style={{
        width: 250,
      }}
      onSelect={(e, object) => onSelect(object)}
      onSearch={handleSearch}
      options={suggestions}
      value={text}
      autoFocus
      // open={true}
      onKeyPress={(ev) => handleKeyPress(ev)}
    >
      <TextArea
        placeholder={"Enter module code / title\ne.g CS1101S\nMA1521"}
        className="custom"
        style={{
          height: 80,
        }}
        onKeyPress={(ev) => handleKeyPress(ev)}
      />
    </AutoComplete>
  </div>
  );
};

AutoCompleteInput.propTypes = {
  setSelectedModules: PropTypes.func.isRequired,
  modplan: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  modplan: state.modplan,
});

export default connect(mapStateToProps, { setSelectedModules })(AutoCompleteInput);