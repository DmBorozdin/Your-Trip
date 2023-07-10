import React from "react";
import CardsList from "../cards-list/cards-list";
import { useSelector } from "react-redux";
import { ExpandMore } from "@mui/icons-material";
import { getOffers } from "../../store/offers/selector";
import styles from "./main.module.scss";
import { closeError, fetchLocation } from "../../store/offers/offers";
import { useAppDispatch } from "../../app/hooks";
import { SearchOutlined } from "@ant-design/icons";
import { DatePicker, Form, Input, Space, Button, Alert } from "antd";
import dayjs from "dayjs";

const DATE_FORMAT = "YYYY-MM-DD";

const Main = () => {
  const { offers, location, totalOffers, isLoading, isError } =
    useSelector(getOffers);
  const dispatch = useAppDispatch();

  const handleSubmit = (value: {
    location: string;
    rangePicker: Array<dayjs.Dayjs>;
  }) => {
    dispatch(
      fetchLocation({
        location: value.location,
        checkIn: value.rangePicker[0].format(DATE_FORMAT),
        checkOut: value.rangePicker[1].format(DATE_FORMAT),
      })
    );
  };

  return (
    <main className={styles.main}>
      <div>
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
                <Input placeholder="Where are we flying?" />
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  htmlType="submit"
                  loading={isLoading}
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
              initialValue={[dayjs(), dayjs().add(1, "d")]}
            >
              <DatePicker.RangePicker format={DATE_FORMAT} />
            </Form.Item>
          </Form>
          {isError && (
            <Alert
              type="error"
              message="Loading error"
              showIcon
              closable
              onClose={() => dispatch(closeError())}
            />
          )}
        </section>
      </div>
      {location.title && (
        <div className={styles.cities}>
          <div className={`${styles.placesContainer} ${styles.container}`}>
            <section className={styles.places}>
              <b className={styles.placesFound}>
                {totalOffers} places to stay in {location.title}
              </b>
              <form className={styles.sorting} action="#" method="get">
                <span className={styles.sortingCaption}>Sort by</span>
                <span className={styles.sortingType} tabIndex={0}>
                  Popular
                  <ExpandMore className={styles.sortingArrow} />
                </span>
                <ul className={styles.options}>
                  <li
                    className={`${styles.option} ${styles.optionActive}`}
                    tabIndex={0}
                  >
                    Popular
                  </li>
                  <li className={`${styles.option}`} tabIndex={0}>
                    Price: low to high
                  </li>
                  <li className={`${styles.option}`} tabIndex={0}>
                    Price: high to low
                  </li>
                  <li className={`${styles.option}`} tabIndex={0}>
                    Top rated first
                  </li>
                </ul>
              </form>
              <CardsList offers={offers} />
            </section>
          </div>
        </div>
      )}
    </main>
  );
};

export default Main;
