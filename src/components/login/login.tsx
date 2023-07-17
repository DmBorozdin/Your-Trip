import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./login.module.scss";
import { auth } from "../../store/users/users";
import { getUserData } from "../../store/users/selector";
import { APPRoute } from "../../const";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [err, setErr] = useState(false);
  const loginRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const { users } = useSelector(getUserData);
  const navigate = useNavigate();

  const handleSubmit = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    const indexLogin = users.findIndex(
      (user) => user.login === loginRef.current?.value
    );
    if (
      indexLogin >= 0 &&
      users[indexLogin].password === passwordRef.current?.value
    ) {
      dispatch(auth(users[indexLogin].id));
      setErr(false);
      navigate(APPRoute.MAIN);
    } else {
      setErr(true);
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <section className={styles.login}>
          <h1 className={styles.title}>Login</h1>
          <form className={styles.form}>
            <div>
              <input
                ref={loginRef}
                className={styles.input}
                type="email"
                name="email"
                placeholder="Email"
                required
              />
            </div>
            <div>
              <input
                ref={passwordRef}
                className={styles.input}
                type="password"
                name="password"
                placeholder="Password"
                required
              />
            </div>
            {err && <div className={styles.error}>Wrong login/password</div>}
            <button
              className={styles.button}
              type="submit"
              onClick={handleSubmit}
            >
              Sign in
            </button>
          </form>
        </section>
      </div>
    </main>
  );
};

export default Login;
