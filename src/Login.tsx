import React, { useState } from 'react';
import { Button, Form, Input, message, Select } from 'antd';
import styles from './Login.module.less';

const { Option } = Select;

interface LoginForm {
  username: string;
  password: string;
  role: string;
  phone: string;
}

function About () {
  const onFinish = (values: LoginForm) => {
    try {
      message.success(`Success: ${values.username}, ${values.password}, ${values.role}, ${values.phone}`);
    } catch (e) {
      message.error(`Error: ${e}`);
    }
  };

  const rules = {
    username: [{ required: true, message: 'Username should not be empty' }],
    password: [{ required: true, message: 'Password should not be empty' }],
    role: [{ required: true, message: 'Please select a role' }],
    phone: [{ required: true, message: 'Phone should not be empty' }]
  };

  const roleOptions = [
    { label: '人生赢家', value: '人生赢家' },
    { label: '失败人', value: '失败人' }
  ];

  const [loginForm] = Form.useForm();

  const [formFieldDisabled, setFormFieldDisabled] = useState(false);

  const onRoleChange = (value: string) => {
    if (value === '人生赢家') {
      message.info('就你个小小别扇做题人还想当人赢？');
      setFormFieldDisabled(true);
    } else {
      setFormFieldDisabled(false);
    }
  };

  const [loginFormFields, setLoginFormFields] = useState({ username: '', password: '', role: '', phone: '' } as LoginForm);

  const onLoginFormChange = (loginForm: LoginForm) => {
    setLoginFormFields({ ...loginFormFields, ...loginForm });
  };

  return (
    <div className={styles.container}>
      <Form
        form={loginForm}
        name="loginForm"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        onValuesChange={onLoginFormChange}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={rules.username}
        >
          <Input className={styles.field} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={rules.password}
        >
          <Input.Password className={styles.field} />
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          rules={rules.role}
        >
          <Select onChange={onRoleChange} allowClear>
            {
              roleOptions.map(role => {
                return <Option key={role.value} value={role.value}>{role.label}</Option>;
              })
            }
          </Select>
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          rules={rules.phone}
        >
          <Input className={styles.field} disabled={formFieldDisabled} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" disabled={formFieldDisabled}>
            Submit
          </Button>
        </Form.Item>
      </Form>

      <div className={styles['display-area']}>
        <span>Username: {loginFormFields.username}</span>
        <span>Password: {loginFormFields.password}</span>
        <span>Role: {loginFormFields.role}</span>
        <span>Phone: {loginFormFields.phone}</span>
      </div>
    </div>
  );
}

export default About;
