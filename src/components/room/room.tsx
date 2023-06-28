import React from "react";
import { Link, useParams } from "react-router-dom";
import { APPRoute } from "../../const";

const Room = () => {
  const pageId = Number(useParams().id);
  return (
    <React.Fragment>
      <div>Комната {pageId}</div>
      <Link to={APPRoute.MAIN}>На главную</Link>
    </React.Fragment>
  );
};

export default Room;
