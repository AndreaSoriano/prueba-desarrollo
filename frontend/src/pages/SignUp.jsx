import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, notification, Typography } from "antd";
import { useRegisterMutation } from "../redux/api/auth";
const { Title } = Typography;

const SignUp = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (message, type) => {
    api[type]({
      message: type === "error" ? "Error" : "Exitoso!",
      description: message,
    });
  };

  const onFinish = async (data) => {
    try {
      const message = await register(data).unwrap();
      openNotification(message, "success");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      const data = (
        <>
          {error.data.map((e, i) => (
            <p key={i}>{e[0]}</p>
          ))}
        </>
      );
      openNotification(data, "error");
    }
  };
  return (
    <>
      {contextHolder}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Title>Sign Up</Title>
        <Form
          name="basic"
          layout="vertical"
          form={form}
          onFinish={onFinish}
          autoComplete="off"
          style={{ width: 400 }}
        >
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
            label="Repeat Password"
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
            <Button htmlType="submit" loading={isLoading} type="primary">
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
export default SignUp;
