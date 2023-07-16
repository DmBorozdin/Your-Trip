import styles from "./search-form.module.scss";
import { DatePicker, Form, Input, Space, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { DATE_FORMAT } from "../../const";
import { makeLocationUrl } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { getAuthUserId } from "../../store/users/selector";
import { addHistory } from "../../store/users/users";
import { useNavigate } from "react-router-dom";

interface InitialValue {
  initialValue: { location: string; checkIn: string; checkOut: string };
}

interface Form {
  location: string;
  rangePicker: Array<dayjs.Dayjs>;
}

const formatLocationName = (location: string) =>
  location[0].toUpperCase() + location.slice(1);

const SearchForm = ({ initialValue }: InitialValue) => {
  const authUser = useSelector(getAuthUserId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (value: Form) => {
    const url = makeLocationUrl(
      value.location,
      value.rangePicker[0],
      value.rangePicker[1]
    );
    const locationFormated = formatLocationName(value.location);

    if (authUser) {
      dispatch(addHistory({ title: locationFormated, url }));
    }
    navigate(url);
  };

  return (
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
                defaultValue={[initialValue.location]}
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
            initialValue={[
              dayjs(initialValue.checkIn),
              dayjs(initialValue.checkOut),
            ]}
          >
            <DatePicker.RangePicker format={DATE_FORMAT} />
          </Form.Item>
        </Form>
      </section>
    </div>
  );
};

export default SearchForm;
