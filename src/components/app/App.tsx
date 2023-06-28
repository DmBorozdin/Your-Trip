import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "../main/main";
import Login from "../login/login";
import SignUp from "../sign-up/sign-up";
import Favorites from "../favorites/favorites";
import Room from "../room/room";
import NotFoundScreen from "../not-found-screen/not-found-screen";
import Header from "../header/header";
import { APPRoute } from "../../const";

const App = () => {
  return (
    <Routes>
      <Route element={<Header />}>
        <Route path={APPRoute.MAIN} element={<Main />} />
        <Route path={APPRoute.LOGIN} element={<Login />} />
        <Route path={APPRoute.SIGNUP} element={<SignUp />} />
        <Route path={APPRoute.FAVORITES} element={<Favorites />} />
        <Route path={APPRoute.ROOM + APPRoute.ID} element={<Room />} />
      </Route>
      <Route path={APPRoute.NOTFOUND} element={<NotFoundScreen />} />
    </Routes>
  );
};

export default App;
