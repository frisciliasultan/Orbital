import { Form, Button, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { generateOptions } from "../utils/commonFunctions";
// import AutocompleteText from "../Pages/Module Planner Page/AutocompleteText";
import React, { useState, useEffect} from "react";

const { Option } = Select;

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 },
    },
  };
  
  

  const DynamicFieldSet = (props) => {
   
    const [fields, setFields] = useState();
    const [options, setOptions] = useState(props.optionList);

    const handleRemove = (index) => {
      const updated = [...props.value];

       //add removed option to options in state
      const temp = [...options];
        for(let i = 0; i < props.optionList.length; i++) {
          if(props.optionList[i].fullName === updated[index].name) {
            temp.splice(i, 1, props.optionList[i]);
            break;
          }
        }
       setOptions(temp);

      //remove option from userInput state in acad settings page
      updated.splice(index, 1);
      props.setUserInput({[props.name]: updated});
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
          
          if(props.optionList[i].fullName === object.value) {
            temp.splice(i, 1, null);
          } 
        }
       setOptions(temp);

      updated[index] = {
                        name: object.value,
                        tag: object.tag
                      };
      props.setUserInput({[object.name]: updated});
  }

    useEffect(() => {
      let updatedField = [];
      if(props.value) {
        for (let i = 0; i < props.value.length; i++) {
          updatedField[i] = {fieldKey: i,
                              isListField: true,
                              key: i,
                              name: i}
        }
        setFields(updatedField);
      }
    }, [])

  //   useEffect(() => {
  //     if(props.value[0]) {
  //       let updated = [...options];
        
  //       props.value.map((object) => {
  //         for(let i = 0; i < updated.length; i++) {
  //           if(updated[i].fullName === object.name) {
  //               updated.splice(i, 1);
  //               break;
  //           }
  //         }
  //       });
  //       setOptions(updated);
  //   }
  // }, [props.value]);

  console.log(options)
  console.log(props.value)
    return (
      <Form name="dynamic_form_item" 
        {...formItemLayoutWithOutLabel}>
          
        <Form.List 
        // name={props.name}
        name="name">
          {(fields, { add, remove }) => {
            return (
              <div>
                
                {fields.map((field, index) => (
                  <Form.Item
                    {...(formItemLayoutWithOutLabel)}
                    required={false}
                    key={field.key}
                  >
                    <Form.Item
                      // {...field}
                      // validateTrigger={['onChange', 'onBlur']}
                      // rules={[
                      //   {
                      //     required: true,
                      //     whitespace: true,
                      //     message: `Please input ${props.name} or delete this field.`,
                      //   },
                      // ]}
                      noStyle
                    >
                      <Select
                        showSearch
                        onChange={(e, object) => onChange(e, object, index)}
                        defaultValue="None "
                        value={props.value[index] ? props.value[index].name : "None "}
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
                          handleRemove(index);
                        }}
                      />
                    ) : null}
                  </Form.Item>
                ))}
                
                
                  <Form.Item>
                  {options[0] && <Button
                      type="dashed"
                      onClick={() => {
                          add();
                      }}
                      style={{ width: '100%' }}>
                       <PlusOutlined /> Add {props.name === "secondMajors" ? "Major" : props.name}
                    </Button>}
                  </Form.Item>
              </div>
            );
          }}
        </Form.List>
  
        {/* <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item> */}
      </Form>
    );
  };
  

export default DynamicFieldSet;