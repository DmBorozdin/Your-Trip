import React from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "./header.module.scss";
import { APPRoute } from "../../const";

const Header = () => {
  return (
    <div className={styles.page}>
      <header>
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <div className={styles.left}>
              <Link
                to={APPRoute.MAIN}
                className={styles.logoLink + styles.logoLinkActive}
              >
                Your trip
              </Link>
            </div>
            <nav className={styles.nav}>
              <ul className={styles.navList}>
                <li className={styles.navItem}>
                  <a className={styles.navLink} href="#">
                    <div className={styles.avatarWrapper}></div>
                    <span className={styles.userName}>
                      Oliver.conner@gmail.com
                    </span>
                  </a>
                </li>
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
