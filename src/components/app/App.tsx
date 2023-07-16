import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../protected-route/protected-route";
import { APPRoute } from "../../const";
import { Skeleton } from "antd";

const Header = lazy(() => import("../header/header"));
const Main = lazy(() => import("../main/main"));
const Search = lazy(() => import("../search/search"));
const Login = lazy(() => import("../login/login"));
const SignUp = lazy(() => import("../sign-up/sign-up"));
const Favorites = lazy(() => import("../favorites/favorites"));
const Room = lazy(() => import("../room/room"));
const History = lazy(() => import("../history/history"));
const NotFoundScreen = lazy(
  () => import("../not-found-screen/not-found-screen")
);

const App = () => (
  <Suspense fallback={<Skeleton active />}>
    <Routes>
      <Route element={<Header />}>
        <Route path={APPRoute.MAIN} element={<Main />} />
        <Route path={APPRoute.SEARCH} element={<Search />} />
        <Route path={APPRoute.LOGIN} element={<Login />} />
        <Route path={APPRoute.SIGNUP} element={<SignUp />} />
        <Route element={<ProtectedRoute />}>
          <Route path={APPRoute.FAVORITES} element={<Favorites />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path={APPRoute.HISTORY} element={<History />} />
        </Route>
        <Route path={APPRoute.ROOM + APPRoute.ID} element={<Room />} />
      </Route>
      <Route path={APPRoute.NOTFOUND} element={<NotFoundScreen />} />
    </Routes>
  </Suspense>
);

export default App;
