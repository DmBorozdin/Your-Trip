import styles from "./error-fallback.module.scss";
import { useErrorBoundary } from "react-error-boundary";

const ErrorFallback = () => {
  const { resetBoundary } = useErrorBoundary();
  return (
    <main className={styles.container}>
      <h1>Something went wrong :(</h1>
      <button onClick={resetBoundary} className={styles.resetButton}>
        Try again
      </button>
    </main>
  );
};

export default ErrorFallback;
