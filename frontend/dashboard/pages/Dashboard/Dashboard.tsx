import "./Dashboard.css";

import { Outlet } from "react-router";
import Navbar from "../../components/Navbar/Navbar";

const Dashboard = () => {
  return (
    <>
      <Navbar></Navbar>
      <main>
        <Outlet></Outlet>
      </main>
    </>
  );
};

export default Dashboard;
