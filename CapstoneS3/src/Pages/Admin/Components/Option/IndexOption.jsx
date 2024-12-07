import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function IndexOption() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Hàm mở/đóng menu con của "Người dùng"
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  return (
    <div className="bg-gray-800 text-white h-full p-5">
      {/* Logo */}
      <div className="flex items-center mb-8">
        <img src="path_to_your_logo.png" alt="Logo" className="h-10 w-auto" />
        <span className="text-xl font-semibold ml-2">Admin Panel</span>
      </div>

      {/* Menu Items */}
      <div>
        <ul>
          {/* Menu Item 1 */}
          <li className="mb-4">
            <NavLink
              to="/admin/dashboard"  // Đường dẫn tới trang Dashboard
              className="flex items-center px-4 py-2 text-sm hover:bg-gray-700 rounded-md"
            >
              <span className="mr-2">🙎</span> User
            </NavLink>
          </li>

          {/* Menu Item 2 (Người dùng) với submenu */}
          <li className="mb-4">
            <div
              className="flex items-center px-4 py-2 text-sm hover:bg-gray-700 rounded-md cursor-pointer"
              onClick={toggleUserMenu} // Mở/đóng menu con
            >
              <span className="mr-2">👥</span> Người dùng
            </div>
            
            {/* Submenu for "Người dùng" */}
            {isUserMenuOpen && (
              <ul className="pl-6 mt-2">
                <li className="mb-2">
                  <NavLink
                    to="/admin/films"  // Đường dẫn tới trang Films
                    className="flex items-center px-4 py-2 text-sm hover:bg-gray-700 rounded-md"
                  >
                    📽️ Films
                  </NavLink>
                </li>
                <li className="mb-2">
                  <NavLink
                    to="/admin/addnew"  // Đường dẫn tới trang Add New
                    className="flex items-center px-4 py-2 text-sm hover:bg-gray-700 rounded-md"
                  >
                    ➕ Add New
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
          <li className="mb-4">
            <NavLink
              to="/admin/dashboard"  // Đường dẫn tới trang Dashboard
              className="flex items-center px-4 py-2 text-sm hover:bg-gray-700 rounded-md"
            >
              <span className="mr-2">🖥️</span> Showtime
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
