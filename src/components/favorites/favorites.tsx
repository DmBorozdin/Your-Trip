import React from "react";
import { Link } from "react-router-dom";
import { APPRoute } from "../../const";

const Favorites = () => {
  return (
    <React.Fragment>
      <div>Избранное</div>
      <Link to={APPRoute.MAIN}>На главную</Link>
    </React.Fragment>
  );
};

export default Favorites;
