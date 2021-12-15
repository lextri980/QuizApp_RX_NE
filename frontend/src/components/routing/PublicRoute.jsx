import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../layouts/Sidebar";

function PublicRoute() {
  return (
    <>
      <Sidebar/>
      <Outlet />;
    </>
  );
}

export default PublicRoute;
