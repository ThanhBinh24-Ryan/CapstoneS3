import React from 'react';
import { NavLink } from 'react-router-dom';

export default function HeaderAdmin() {
  return (
    <div className="bg-slate-200 text-black flex justify-between items-center p-4">
      {/* Logo */}
      <div className="flex items-center">
        {/* <img src="path_to_your_logo.png" alt="Logo" className="h-10 w-auto" />
        <span className="text-xl font-semibold ml-2">Admin Panel</span> */}
      </div>

      {/* User info and Logout */}
      <div className="flex items-center space-x-4">
        <div className="text-sm">
          <p>Welcome, Admin</p>
          {/* You can dynamically display user info here */}
        </div>
        
        {/* Đăng xuất */}
        <NavLink
          to="/"  // Thay đổi đường dẫn nếu cần
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
        >
          Đăng xuất
        </NavLink>
      </div>
    </div>
  );
}
