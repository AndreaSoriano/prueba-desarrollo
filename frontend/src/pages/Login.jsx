import React from "react";
import { Button, Form, Input, Typography, notification } from "antd";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../redux/api/auth";
import { useGenerateTokenMutation } from "../redux/api/token";
import { generatePath, useNavigate } from "react-router-dom";
import tokenRoutes from "../routes";
import { setCredentials } from "../redux/reducers/auth";
const { Title } = Typography;

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [generateToken] = useGenerateTokenMutation();

  const openNotification = (message) => {
    api["error"]({
      message: "Error",
      description: <p>{message}</p>,
    });
  };

  const onFinish = async (data) => {
    try {
      const credentials = await login(data).unwrap();
      dispatch(setCredentials(credentials));
      navigate(generatePath(tokenRoutes.INPUTOKEN));
      generateToken();
    } catch (error) {
      openNotification(error.data);
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
        <Title>Login</Title>
        <Form
          name="basic"
          style={{ width: 400 }}
          form={form}
          onFinish={onFinish}
          autoComplete="off"
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
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary" loading={isLoading}>
              Login
            </Button>
          </Form.Item>
          {/* {error?.length && (
          <Alert
            message="Error"
            description={"This is an error message about copywriting."}
            type="error"
            showIcon
          />
        )} */}
        </Form>
      </div>
    </>
  );
};

export default Login;
