import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../protected-route/protected-route";
import { APPRoute } from "../../const";
import { useSelector } from "react-redux";
import { getUserData } from "../../store/users/selector";
import { Skeleton, Spin } from "antd";

const Header = lazy(() => import("../header/header"));
const Main = lazy(() => import("../main/main"));
const Login = lazy(() => import("../login/login"));
const SignUp = lazy(() => import("../sign-up/sign-up"));
const Favorites = lazy(() => import("../favorites/favorites"));
const Room = lazy(() => import("../room/room"));
const NotFoundScreen = lazy(
  () => import("../not-found-screen/not-found-screen")
);

const App = () => {
  const { authUser } = useSelector(getUserData);

  return (
    <Suspense fallback={<Skeleton active />}>
      <Routes>
        <Route element={<Header />}>
          <Route path={APPRoute.MAIN} element={<Main />} />
          <Route path={APPRoute.LOGIN} element={<Login />} />
          <Route path={APPRoute.SIGNUP} element={<SignUp />} />
          <Route element={<ProtectedRoute authUser={authUser} />}>
            <Route path={APPRoute.FAVORITES} element={<Favorites />} />
          </Route>
          <Route path={APPRoute.ROOM + APPRoute.ID} element={<Room />} />
        </Route>
        <Route path={APPRoute.NOTFOUND} element={<NotFoundScreen />} />
      </Routes>
    </Suspense>
  );
};

export default App;
