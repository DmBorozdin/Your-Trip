import { useNavigate } from "react-router-dom";
import styles from "./main.module.scss";
import { SearchOutlined } from "@ant-design/icons";
import { DatePicker, Form, Input, Space, Button } from "antd";
import dayjs from "dayjs";

const DATE_FORMAT = "YYYY-MM-DD";

const Main = () => {
  const navigate = useNavigate();

  const handleSubmit = (value: {
    location: string;
    rangePicker: Array<dayjs.Dayjs>;
  }) => {
    navigate(
      `search?location=${value.location}&checkIn=${value.rangePicker[0].format(
        DATE_FORMAT
      )}&checkOut=${value.rangePicker[1].format(DATE_FORMAT)}`
    );
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
