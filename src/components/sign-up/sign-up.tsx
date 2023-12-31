import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../store/users/users";
import styles from "./sign-up.module.scss";
import { useNavigate } from "react-router-dom";
import { APPRoute } from "../../const";
import { getUserData } from "../../store/users/selector";

const SignUp = () => {
  const [err, setErr] = useState(false);
  const loginRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useSelector(getUserData);

  const handleSubmit = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    const indexLogin = users.findIndex(
      (user) => user.login === loginRef.current?.value
    );

    if (indexLogin < 0) {
      dispatch(
        addUser({
          login: loginRef.current?.value,
          password: passwordRef.current?.value,
        })
      );
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
          <h1 className={styles.title}>Sign up</h1>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div>
              <input
                ref={loginRef}
                className={styles.input}
                type="email"
                name="email"
                placeholder="Email"
                defaultValue={``}
                pattern="^([^ ]+@[^ ]+\.[a-z]{2,6}|)$"
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
                minLength={4}
              />
            </div>
            {err && (
              <div className={styles.error}>
                User with this login already exists
              </div>
            )}
            <button className={styles.button} type="submit">
              Create an account
            </button>
          </form>
        </section>
      </div>
    </main>
  );
};

export default SignUp;
