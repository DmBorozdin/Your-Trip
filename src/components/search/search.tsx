import CardsList from "../cards-list/cards-list";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getOffersForAuth } from "../../store/offers/selector";
import styles from "./search.module.scss";
import { SearchOutlined } from "@ant-design/icons";
import { DatePicker, Form, Input, Space, Button, Alert, Spin } from "antd";
import dayjs from "dayjs";
import { useGetAllOffersQuery } from "../../services/apiSlice";
import { APPRoute } from "../../const";
import { useDispatch, useSelector } from "react-redux";
import { getAuthUserId, getFavoritesObj } from "../../store/users/selector";
import { addHistory } from "../../store/users/users";

const DATE_FORMAT = "YYYY-MM-DD";

const Search = () => {
  const [searchParams] = useSearchParams();
  const params = {
    location: searchParams.get("location") || "",
    checkIn: searchParams.get("checkIn") || "",
    checkOut: searchParams.get("checkOut") || "",
  };
  const navigate = useNavigate();
  const { data, isLoading, isSuccess, isError } = useGetAllOffersQuery(params);
  const favorites = useSelector(getFavoritesObj);
  const offersForAuth = getOffersForAuth(favorites, data);
  const authUser = useSelector(getAuthUserId);
  const dispatch = useDispatch();

  const handleSubmit = (value: {
    location: string;
    rangePicker: Array<dayjs.Dayjs>;
  }) => {
    const url = `${APPRoute.SEARCH}?location=${
      value.location
    }&checkIn=${value.rangePicker[0].format(
      DATE_FORMAT
    )}&checkOut=${value.rangePicker[1].format(DATE_FORMAT)}`;
    const locationFormated =
      value.location[0].toUpperCase() + value.location.slice(1);
    if (authUser) {
      dispatch(addHistory({ title: locationFormated, url }));
    }
    navigate(url);
  };

  return (
    <main className={styles.main}>
      <div className={styles.search}>
        <section className={`${styles.container} ${styles.searchContainer}`}>
          <Form
            name="searchForm"
            size="large"
            className={styles.searchForm}
            onFinish={handleSubmit}
          >
            <Form.Item
              name="location"
              rules={[{ required: true, message: "Please input destination!" }]}
              className={styles.searchInput}
            >
              <Space.Compact style={{ width: "100%" }}>
                <Input
                  placeholder="Where are we flying?"
                  defaultValue={[params.location]}
                />
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  htmlType="submit"
                />
              </Space.Compact>
            </Form.Item>
            <Form.Item
              name="rangePicker"
              rules={[
                {
                  type: "array" as const,
                  required: true,
                  message: "Please select date!",
                },
              ]}
              initialValue={[dayjs(params.checkIn), dayjs(params.checkOut)]}
            >
              <DatePicker.RangePicker format={DATE_FORMAT} />
            </Form.Item>
          </Form>
        </section>
      </div>
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
