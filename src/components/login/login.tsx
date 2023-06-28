import React from "react";
import { Link } from "react-router-dom";
import { APPRoute } from "../../const";

const Login = () => {
  return (
    <React.Fragment>
      <div>Введите логин и пароль</div>
      <Link to={APPRoute.MAIN}>На главную</Link>
    </React.Fragment>
  );
};

export default Login;
