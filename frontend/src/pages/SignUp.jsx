import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { useRegisterMutation } from "../redux/api/auth";

const SignUp = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const onFinish = async (data) => {
    try {
      await register(data).unwrap();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form name="basic" form={form} onFinish={onFinish} autoComplete="off">
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password1"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password2"
        rules={[
          {
            required: true,
            message: "Please input again your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={isLoading}>
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  );
};
export default SignUp;
