import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import {
  SearchOutlined,
  CheckCircleTwoTone,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { Input, Button, notification, Space, Table, Typography } from "antd";
import { useTokensQuery } from "../redux/api/token";
import { useLogoutMutation } from "../redux/api/auth";
import { useNavigate } from "react-router-dom";
import Highlighter from "react-highlight-words";
import moment from "moment-timezone";
const { Title } = Typography;

const User = () => {
  const { user } = useSelector(({ auth }) => auth);
  const navigate = useNavigate();
  const { data, isFetching } = useTokensQuery({
    user__username: "test-postman",
  });
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [logout] = useLogoutMutation();
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (!user) navigate("/");
  });

  const openNotification = (message, type) => {
    api[type]({
      message: type === "error" ? "Error" : "Success",
      description: message,
    });
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="link"
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            disabled={!selectedKeys.length}
          >
            {"Reset"}
          </Button>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            size="small"
          >
            OK
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const clicLogout = async () => {
    try {
      const message = await logout().unwrap();
      openNotification(message, "success");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      align: "center",
    },
    {
      title: "Token",
      dataIndex: "token",
      align: "center",
      ...getColumnSearchProps("token"),
    },
    {
      title: "Created at",
      dataIndex: "created_at",
      sorter: (a, b) => moment(a.created_at) - moment(b.created_at),
      showSorterTooltip: true,
      render: (text) => moment(text).format("DD/MM/YYYY hh:mm:ss"),
    },
    {
      title: "Is used",
      dataIndex: "is_used",
      filterMultiple: false,
      align: "center",
      filters: [
        {
          text: "Yes",
          value: true,
        },
        {
          text: "No",
          value: false,
        },
      ],
      onFilter: (value, record) => value === record.is_used,
      render: (text) =>
        text ? (
          <CheckCircleTwoTone
            twoToneColor={"#13A94F"}
            style={{ fontSize: 20 }}
          />
        ) : (
          <CheckCircleOutlined style={{ color: "#bfbfbf", fontSize: 20 }} />
        ),
    },
  ];
  return (
    <>
      {contextHolder}
      <Title>Welcome, {user}!</Title>
      <br />
      <Title level={3}>Your generated tokens</Title>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Table
          columns={columns}
          dataSource={data}
          loading={isFetching}
          rowKey={"id"}
          style={{ width: "70%" }}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Button type="link" onClick={clicLogout}>
          Logout
        </Button>
      </div>
    </>
  );
};

export default User;
