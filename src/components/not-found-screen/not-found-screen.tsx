import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { APPRoute } from "../../const";

const NotFoundScreen = () => {
  return (
    <Fragment>
      <div className="user-page">
        <div className="user-page__content">
          <h1>404. Page not found</h1>
          <Link to={APPRoute.MAIN}>Go to the home page</Link>
        </div>
      </div>
    </Fragment>
  );
};

export default NotFoundScreen;
