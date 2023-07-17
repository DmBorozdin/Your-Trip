import styles from "./main.module.scss";
import SearchForm from "../search-form/search-form";
import dayjs from "dayjs";
import { DATE_FORMAT } from "../../const";

const Main = () => (
  <main className={styles.main}>
    <SearchForm
      initialValue={{
        location: "",
        checkIn: dayjs().add(1, "d").format(DATE_FORMAT),
        checkOut: dayjs().add(2, "d").format(DATE_FORMAT),
      }}
    />
  </main>
);

export default Main;
