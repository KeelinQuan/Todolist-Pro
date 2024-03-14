import Header from "./Header";
import BoardInfoBar from "./BoardInfoBar";
import { Outlet } from "react-router-dom";
import './Layout.css'
function BaseLayout() {
  return (
    <div className="base-layout">
      <Header/>
      <BoardInfoBar/>
      <main><Outlet/></main>
    </div>
  );
}

export default BaseLayout;