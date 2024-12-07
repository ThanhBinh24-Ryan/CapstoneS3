import React from "react";
import { Outlet } from "react-router-dom";
import HeaderAdmin from "./Components/Header/HeaderAdmin";
import IndexOption from "./Components/Option/IndexOption";
export default function IndexAdmin() {
  return (
    <div className="flex h-screen">  {/* Thêm h-screen để đảm bảo layout chiếm toàn bộ chiều cao màn hình */}
    <div className="w-60 h-screen  bg-gray-800 text-white">  {/* Sidebar IndexOption */}
      <IndexOption />
    </div>
    <div className="w-full">
      <HeaderAdmin />
      <Outlet />
    </div>
  </div>
  
  );
}
