import React from "react";
import { Link } from "react-router-dom";
import { APPRoute } from "../../const";

const SignUp = () => {
  return (
    <React.Fragment>
      <div>Регистрация</div>
      <Link to={APPRoute.MAIN}>На главную</Link>
    </React.Fragment>
  );
};

export default SignUp;
