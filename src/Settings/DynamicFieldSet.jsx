import { Form, Input, Button, Switch } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import AutocompleteText from "../Pages/Module Planner Page/AutocompleteText";
import React, { useState, useEffect} from "react";

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
    
    const handleRemove = (index) => {
      const original = props.value ? [...props.value] : [];
      original.splice(index, 1);
      props.setUserInput({[props.name]: original});
    }

    const onFinish = values => {
      console.log('Received values of form:', values);
    };

    const [fields, setFields] = useState();

    useEffect(() => {
      let updatedField;
      if(props.value) {
        for (let i = 0; i < props.value.length; i++) {
          updatedField[i] = {fieldKey: i,
                              isListField: true,
                              key: i,
                              name: i      }
        }
        setFields(updatedField);
      }
    }, [])
  
    
    return (
      <Form name="dynamic_form_item" 
        {...formItemLayoutWithOutLabel} 
        onFinish={onFinish}
        >
          
        <Form.List 
        // name={props.name}
        name="name">
          {(fields, { add, remove }) => {
            console.log(fields)
            console.log(add)
            console.log(remove)
            return (
              <div>
                
                {fields.map((field, index) => (
                  <Form.Item
                    {...(formItemLayoutWithOutLabel)}
                    // label={index === 0 ? 'SecondMajors' : ''}
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
                      <AutocompleteText category={props.name}
                      setUserInput ={props.setUserInput}
                      index={index}
                      value={props.value}/>
                      {/* <Input placeholder={`Enter ${props.name}`} style={{ width: '60%' }} /> */}
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
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                    style={{ width: '100%' }}
                  >
                    <PlusOutlined /> Add {props.name === "secondMajor" ? "Major" : "Minor"}
                  </Button>
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