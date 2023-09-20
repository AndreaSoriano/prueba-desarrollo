import React, { useEffect } from "react";
import { Button, Form, Input, notification, Space, Typography } from "antd";
import { useSelector } from "react-redux";
import { useTokensQuery, useTokenUseMutation } from "../redux/api/token";
import { generatePath, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import tokenRoutes from "../routes";
const { Title } = Typography;

const InputToken = () => {
  const { user } = useSelector(({ auth }) => auth);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { isLoading } = useTokensQuery({ is_active: true });
  const [useToken, { isLoading: useLoading }] = useTokenUseMutation();
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (!user) navigate("/");
  });

  const onFinish = async (data) => {
    try {
      const message = await useToken(data).unwrap();
      openNotification(message, "success");
      setTimeout(() => {
        navigate(generatePath(tokenRoutes.USER));
      }, 2000);
    } catch (error) {
      openNotification(error.data, "error");
    }
  };

  const openNotification = (message, type) => {
    api[type]({
      message: type === "error" ? "Error" : "Success",
      description: message,
    });
  };

  return (
    <>
      {contextHolder}
      <Title>Input your token</Title>
      <Form name="basic" form={form} onFinish={onFinish} autoComplete="off">
        <Space>
          <Form.Item
            label="Token"
            name="token"
            rules={[
              {
                required: true,
                message: "Please input the token!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Link
            target="_blank"
            to={generatePath(tokenRoutes.TOKEN, { user: user })}
          >
            <Button type="link" disabled={isLoading}>
              Check your token
            </Button>
          </Link>
        </Space>
        <Form.Item>
          <Button htmlType="submit" disabled={isLoading} loading={useLoading}>
            Verify
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default InputToken;
