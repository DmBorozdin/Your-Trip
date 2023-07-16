import { useNavigate } from "react-router-dom";
import styles from "./main.module.scss";
import { SearchOutlined } from "@ant-design/icons";
import { DatePicker, Form, Input, Space, Button } from "antd";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { getAuthUserId } from "../../store/users/selector";
import { addHistory } from "../../store/users/users";
import { APPRoute } from "../../const";

const DATE_FORMAT = "YYYY-MM-DD";

const Main = () => {
  const navigate = useNavigate();
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
                <Input placeholder="Where are we flying?" />
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
              initialValue={[dayjs().add(1, "d"), dayjs().add(2, "d")]}
            >
              <DatePicker.RangePicker format={DATE_FORMAT} />
            </Form.Item>
          </Form>
        </section>
      </div>
    </main>
  );
};

export default Main;
