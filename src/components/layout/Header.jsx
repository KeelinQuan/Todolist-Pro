import { useEffect, useState } from "react";
import { Tooltip } from "antd";
import { useSelector, useDispatch } from "react-redux";
import SearchTask from "./SearchTask";
import { warningTasksThunk } from "@/redux/taskList/thunk";
import ResultTasksList from "./ResultTasksList";
import { logout } from "@/redux/auth";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
export default function Header() {
  const user = useSelector((state) => state.auth.user);
  const warningTasks = useSelector((state) => state.taskList.warningTasks);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [showWarningPopup, setShowWarningPopup] = useState(false);
  useEffect(() => {
    dispatch(warningTasksThunk());
  }, []);
  const handleLogout = () => {
    dispatch(logout());
    nav("/");
  };
  return (
    <header className="masthead">
      <div className="boards-menu">
        <button className="boards-btn btn">
          <i className="fab fa-trello boards-btn-icon"></i>Boards
        </button>
        <SearchTask />
      </div>
      <div className="logo">
        <h1>
          <i className="fab fa-trello logo-icon" aria-hidden="true"></i>TodoList
          Pro
        </h1>
      </div>
      <div className="user-settings">
        <button className="user-settings-btn btn" aria-label="Create">
          <i className="fas fa-plus" aria-hidden="true"></i>
        </button>

        <button
          className="user-settings-btn btn"
          aria-label="Notifications"
          onClick={() => {
            setShowWarningPopup(!showWarningPopup);
          }}
        >
          <i className="fas fa-bell" aria-hidden="true"></i>
          <span>{warningTasks?.length}</span>
        </button>
        {showWarningPopup ? (
          <ResultTasksList
            style={{
              right: "50px",
            }}
            listTask={warningTasks}
            handleItemClick={(e) => {
              setShowWarningPopup(false);
            }}
          />
        ) : null}
        <Tooltip title={user?.username}>
          <button className="user-settings-btn btn" aria-label="User Settings">
            <i className="fas fa-user-circle" aria-hidden="true"></i>
          </button>
        </Tooltip>
        <button
          className="user-settings-btn btn"
          aria-label="Information"
          onClick={() => {
            handleLogout();
          }}
        >
          <LogoutOutlined />
        </button>
      </div>
    </header>
  );
}
