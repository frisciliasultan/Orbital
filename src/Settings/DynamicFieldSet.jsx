import { Form, Button, Select, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { generateOptions } from "../utils/commonFunctions";
import React, { useState, useEffect} from "react";
import isEmpty from 'is-empty';

const { Option } = Select;
  
  const DynamicFieldSet = (props) => {
    const [options, setOptions] = useState(props.optionList);
    const [keyList, setKeyList] = useState([1]);
    const length = keyList.length;
  
    useEffect(() => {
      if(props.value.length > 0) {
        //set options after first render
        const tempOptions = [...props.optionList];
        props.value.map((object) => {
          console.log(object)
          for(let i = 0; i < props.optionList.length; i++) {
            //remove selected option from options
              if(props.optionList[i].fullName === object.name) {
                console.log('removed')
                tempOptions.splice(i, 1, null);
              } 
          }
        })
        setOptions(tempOptions);

   
        let userInputLength = props.value.length;
        //determine how many fields in the beginning
        let temp = [];
        while(userInputLength-- > 0) {
          console.log('called')
          temp.push(1);
        }
        setKeyList(temp);          
      }
    }, []);

    const renderIntial = () => {
        return keyList.map((key, index) => {
          return (
            <Form.Item className="form-field">
               <Form.Item>
                <Select
                  showSearch
                  onChange={(e, object) => onChange(e, object, index)}
                  defaultValue="None "
                  value={props.value[index] ? props.value[index].name : "None "}
                  style={{ width: 300 }}
                  optionFilterProp="children"
                  filterOption={(input, option) => {
                      return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }}>
                  <Option 
                      key={"choose" + props.label}
                      value="None " 
                        disabled>
                      {"Choose " + props.label}
                  </Option>
                  {generateOptions((options ? options : props.optionList), props.name)}
                </Select>
            </Form.Item>

              {(length > 1) ? (
                <MinusCircleOutlined
                  className="dynamic-delete-button"
                  onClick={() => {
                    handleRemove(index);
                  }}
                />
              ): null}
            </Form.Item>
          )
        })
  }
    const handleAdd = () => {
      if(props.value[length - 1]) {
        setKeyList([...keyList, 1]);
      } else {
        message.warning({
          content: 'Please choose an option before adding',
        })

        message.config({
          maxCount: 1,
          duration: .7,
          top: '70px',
        })

      }
    }

    const handleRemove = (index) => {
      const updated = [...props.value];
      if(updated[index]) {
         
      const temp = [...options];
      //add removed option to options in state
      for(let i = 0; i < props.optionList.length; i++) {
        if(props.optionList[i].fullName === updated[index].name) {
          //remove null and add back option
          temp.splice(i, 1, props.optionList[i]);
          break;
        }
      }
      setOptions(temp);

      //remove option from userInput state in acad settings page
      updated.splice(index, 1);
      props.setUserInput({[props.name]: updated});
      }

      //remove one member from keyList
      const updatedKeyList = [...keyList];
      updatedKeyList.pop();
      setKeyList(updatedKeyList);
    }

    const onChange = (e, object, index) => {
      const updated = [...props.value];
     
      const temp = [...options];
        for(let i = 0; i < props.optionList.length; i++) {
          if(updated[index]) {
             //add removed option back into options
            if(props.optionList[i].fullName === updated[index].name) {
              temp.splice(i, 1, props.optionList[i]);
            }
          }
          
          //remove selected option from options
          if(props.optionList[i].fullName === object.value) {
            temp.splice(i, 1, null);
          } 
        }
       setOptions(temp);

      //replace selected option at that particular index 
      // in userInput in acad settings
      //with new selected option
      updated[index] = {
                        name: object.value,
                        tag: object.tag
                      };
      props.setUserInput({[object.name]: updated});
  }

  //check whether options is all null or at least 1 filled
  const checkIsOptionsEmpty = () => {
    for(let i = 0; i < options.length; i++ ) {

      if(options && options[i]) {
        return false;
      } 
    }
    return true;
  }

    return (
      // <Form 
        // name="dynamic_form_item" 
        // // form={form}
        // // fields={fields}
        // // {...formItemLayoutWithOutLabel}
        // >
          
        // <Form.List 
        //   name={props.name}>
        //   {(fields, { add, remove }) => {
        //     console.log(fields)
        //     return (
              <div>
                {renderIntial()}
                {/* {fields.map((field, index) => (
                  
                  <Form.Item
                    // {...(formItemLayoutWithOutLabel)}
                    required={false}
                    key={field.key}
                  >
                    <Form.Item */}
                      {/* // {...field}
                      // validateTrigger={['onChange', 'onBlur']}
                      // rules={[ */}
                      {/* //   { */}
                      {/* //     required: true,
                      //     whitespace: true,
                      //     message: `Please input ${props.name} or delete this field.`,
                      //   },
                      // ]}
                      noStyle
                    >
                      <Select
                        showSearch
                        onChange={(e, object) => onChange(e, object, (index + props.value.length))}
                        defaultValue="None "
                        value={props.value[index + props.value.length] ? props.value[index + props.value.length].name : "None "}
                        style={{ width: 250 }}
                        optionFilterProp="children"
                        filterOption={(input, option) => {
                            return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }}>
                        <Option 
                            key={"choose" + props.label}
                            value="None " 
                             disabled>
                            {"Choose " + props.label}
                        </Option>
                        {generateOptions((options ? options : props.optionList), props.name)}
                      </Select>
                    </Form.Item>

                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        className="dynamic-delete-button"

                        onClick={() => {
                          remove(field.name);
                          handleRemove(index + props.value.length);
                        }}
                      />
                    ) : null}
                  </Form.Item>
                ))} */}
                
                
                {!checkIsOptionsEmpty() && 
                <Form.Item>
                  <Button
                      type="dashed"
                      onClick={() =>
                          // if(props.value[index] || (index + 1)=== 0) {
                            handleAdd()
                          // }
                        }
                      style={{ width: '100%' }}>
                       <PlusOutlined /> Add {props.name === "secondMajors" ? "Major" : props.name}
                    </Button>
                  </Form.Item>}
              </div>

  
        /* <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item> */
    //   </Form>
    );
  };
  

export default DynamicFieldSet;