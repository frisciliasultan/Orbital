import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Modal
} from 'antd';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const RegistrationForm = (props) => {
  const [form] = Form.useForm();

  const onFinish = values => {
    console.log('Received values of form: ', values);
    props.setVisible(false);
  };

  return (
    // <Modal
    // visible={true}
    // title="Change Password"
    // onOk={()=> console.log("ok")}
    // onCancel={()=> console.log("ok")}
    // closable
    // footer={[
      //   <Button key="back" onClick={()=> console.log("ok")}>
      //   Return
      //   </Button>,
      //   // <Button key="submit" type="primary" loading={props.auth.isLoading} onClick={handleOk}>
      //   // Save
      //   // </Button>,
      //   <Form.Item {...tailFormItemLayout}>
      //   <Button type="primary" htmlType="submit">
      //     Submit
      //   </Button>
      // </Form.Item>
//       null
//     ]}
// >
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('The two passwords that you entered do not match!');
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <br/>
      <br/>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    // </Modal>          
  );
};

export default RegistrationForm;