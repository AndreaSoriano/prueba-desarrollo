import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "antd";
import { useTokensQuery } from "../redux/api/token";

const User = () => {
  const { user } = useSelector(({ auth }) => auth);
  const initialParams = { is_used: null, token__icontains: null };
  const { data, isFetching } = useTokensQuery(initialParams);
  return <div>Bienvenido {user}</div>;
};

export default User;
