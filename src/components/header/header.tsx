import React from "react";
import { useDispatch } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import styles from "./header.module.scss";
import { APPRoute } from "../../const";
import { AccountCircle } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { getUserData } from "../../store/users/selector";
import { logOut } from "../../store/users/users";

const Header = () => {
  const { authUser, users } = useSelector(getUserData);
  const user = users.find((user) => user.id === authUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    dispatch(logOut());
    navigate(APPRoute.MAIN);
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <div className={styles.left}>
              <Link to={APPRoute.MAIN} className={styles.logoLink}>
                Your trip
              </Link>
            </div>
            <nav className={styles.nav}>
              <ul className={styles.navList}>
                {typeof user !== `undefined` && (
                  <React.Fragment>
                    <li>
                      <Link className={styles.navLink} to={APPRoute.FAVORITES}>
                        <AccountCircle
                          color="action"
                          className={styles.avatar}
                        />
                        <span className={styles.userName}>{user.login}</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={styles.navLink}
                        to="#"
                        onClick={handleLogOut}
                      >
                        <span className={styles.userName}>Выйти</span>
                      </Link>
                    </li>
                  </React.Fragment>
                )}
                {typeof user === `undefined` && (
                  <React.Fragment>
                    <li>
                      <Link className={styles.navLink} to={APPRoute.LOGIN}>
                        <span className={styles.userName}>Войти</span>
                      </Link>
                    </li>
                    <li>
                      <Link className={styles.navLink} to={APPRoute.SIGNUP}>
                        <span className={styles.userName}>Регистрация</span>
                      </Link>
                    </li>
                  </React.Fragment>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
};

export default Header;
