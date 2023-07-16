import CardsList from "../cards-list/cards-list";
import SearchForm from "../search-form/search-form";
import { Link, useSearchParams } from "react-router-dom";
import { getOffersForAuth } from "../../store/offers/selector";
import styles from "./search.module.scss";
import { Alert, Spin } from "antd";
import { useGetAllOffersQuery } from "../../services/apiSlice";
import { APPRoute } from "../../const";
import { useSelector } from "react-redux";
import { getFavoritesObj } from "../../store/users/selector";

const Search = () => {
  const [searchParams] = useSearchParams();
  const params = {
    location: searchParams.get("location") || "",
    checkIn: searchParams.get("checkIn") || "",
    checkOut: searchParams.get("checkOut") || "",
  };
  const { data, isLoading, isSuccess, isError } = useGetAllOffersQuery(params);
  const favorites = useSelector(getFavoritesObj);
  const offersForAuth = getOffersForAuth(favorites, data);

  return (
    <main className={styles.main}>
      <SearchForm initialValue={params} />
      {isLoading && (
        <div className={styles.preloaderContainer}>
          <Spin tip="Loading" size="large">
            <div className="content" />
          </Spin>
        </div>
      )}
      {isSuccess && data.location.status && data.offers.status && (
        <div className={styles.cities}>
          <div className={`${styles.placesContainer} ${styles.container}`}>
            <section className={styles.places}>
              <b className={styles.placesFound}>
                {data.offers.totalOffers} places to stay in{" "}
                {data.location.title}
              </b>
              <CardsList
                offers={offersForAuth}
                checkIn={params.checkIn}
                checkOut={params.checkOut}
              />
            </section>
          </div>
        </div>
      )}
      {((isSuccess && !data.location.status && !data.offers.status) ||
        isError) && (
        <div className={styles.alertContainer}>
          <Alert type="error" message="Loading error" showIcon closable />
          <Link to={APPRoute.MAIN}>
            <div className={styles.homeLink}>Go to the home page</div>
          </Link>
        </div>
      )}
    </main>
  );
};

export default Search;
