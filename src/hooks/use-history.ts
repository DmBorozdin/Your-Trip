import { useDispatch, useSelector } from "react-redux";
import { addHistory, deleteHistory } from "../store/users/users";
import { getAuthUserId } from "../store/users/selector";

const useHistory = () => {
  const dispatch = useDispatch();
  const authUser = useSelector(getAuthUserId);
  const addHistoryItem = (title: string, url: string) => {
    if (authUser) {
      dispatch(addHistory({ title, url }));
    }
  };
  const resetHistory = () => {
    dispatch(deleteHistory());
  };

  return { addHistoryItem, resetHistory };
};

export default useHistory;
