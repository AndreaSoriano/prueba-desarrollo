import React from "react";
import { Button, Form, Input, Space, Typography } from "antd";
import { useSelector } from "react-redux";
import { useTokensQuery } from "../redux/api/token";
import { generatePath } from "react-router-dom";
import { Link } from "react-router-dom";
import tokenRoutes from "../routes";
const { Title } = Typography;

const InputToken = () => {
  const { user } = useSelector(({ auth }) => auth);
  const [form] = Form.useForm();
  const { isLoading } = useTokensQuery({ is_active: true });

  const onFinish = (data) => {
    console.log(data);
  };

  return (
    <>
      <Title>Ingrese el token</Title>
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
            <Button type="link">Consultar Token</Button>
          </Link>
        </Space>
        <Form.Item>
          <Button htmlType="submit" disabled={isLoading}>
            Verify
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default InputToken;
