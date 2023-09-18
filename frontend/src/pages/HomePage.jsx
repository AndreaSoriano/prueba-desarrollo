import React from "react";
import { Button, Space, Typography } from "antd";
import { useNavigate, generatePath } from "react-router-dom";
import { UserOutlined, SmileOutlined } from "@ant-design/icons";
import tokenRoutes from "../routes";
const { Title } = Typography;
const HomePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Title>What you want to do?</Title>
      <Space size="large">
        <Button type="primary" icon={<UserOutlined />}>
          Login
        </Button>
        <Button
          icon={<SmileOutlined />}
          onClick={(e) => {
            e.preventDefault();
            navigate(generatePath(tokenRoutes.SIGNUP));
          }}
        >
          Sign Up
        </Button>
      </Space>
    </>
  );
};
export default HomePage;
