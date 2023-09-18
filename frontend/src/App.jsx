import React from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import User from "./pages/User";
import InputToken from "./pages/InputToken";
import Token from "./pages/Token";
import NotFound from "./pages/NotFound";
import { Provider } from "react-redux";
import store from "./redux/store";
import tokenRoutes from "./routes";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path={"/"} element={<HomePage />} />
            <Route path={tokenRoutes.LOGIN} element={<Login />} />
            <Route path={tokenRoutes.SIGNUP} element={<SignUp />} />
            <Route path={tokenRoutes.USER} element={<User />} />
            <Route path={tokenRoutes.INPUTOKEN} element={<InputToken />} />
            <Route path={tokenRoutes.TOKEN} element={<Token />} />
            <Route path={"*"} element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
