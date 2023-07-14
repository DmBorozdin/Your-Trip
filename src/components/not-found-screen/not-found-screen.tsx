import { Link } from "react-router-dom";
import { APPRoute } from "../../const";
import styles from "./not-found-screen.module.scss";

const NotFoundScreen = () => {
  return (
    <main className={styles.container}>
      <h1>404. Page not found</h1>
      <Link to={APPRoute.MAIN}>Go to the home page</Link>
    </main>
  );
};

export default NotFoundScreen;
