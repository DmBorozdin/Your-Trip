import React from "react";
import { Link } from "react-router-dom";
import { APPRoute } from "../../const";

const Main = () => {
  return (
    <React.Fragment>
      <div>Главная страница</div>
      <Link to={APPRoute.FAVORITES}>Избранное</Link>
      <Link to={APPRoute.LOGIN}>Логин</Link>
      <Link to={APPRoute.SIGNUP}>Регистрация</Link>
    </React.Fragment>
  );
};

export default Main;
