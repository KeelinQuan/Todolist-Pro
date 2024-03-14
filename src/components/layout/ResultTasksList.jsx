import { Avatar, List } from "antd";
import { useDispatch } from "react-redux";
import { openModal } from "@/redux/modal";
const { VITE_ORIGIN } = import.meta.env;
export default function ResultTasksList(props) {
  const dispatch = useDispatch();
  const handleClick = (item) => {
    dispatch(openModal(item));
  };
  return (
    <List
      itemLayout="horizontal"
      dataSource={props.listTask}
      style={{
        position: "fixed",
        top: "50px",
        width: "300px",
        zIndex: 2,
        background: "white",
        ...props.style,
      }}
      renderItem={(item, index) => {
        let bgItem =
          new Date(item?.attributes?.date) < new Date()
            ? "rgba(0,0,0, 0.1)"
            : "white";
        return (
          <List.Item
            onClick={(e) => {
              props.handleItemClick(e);
              handleClick(item);
            }}
            style={{
              background: bgItem,
            }}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  src={
                    VITE_ORIGIN + item?.attributes?.image?.data?.attributes?.url
                  }
                />
              }
              title={item?.id}
              description={item?.attributes?.title}
            />
          </List.Item>
        );
      }}
    />
  );
}
