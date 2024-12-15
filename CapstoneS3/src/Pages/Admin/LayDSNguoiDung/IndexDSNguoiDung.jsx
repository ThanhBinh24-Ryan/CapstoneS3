import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function IndexDSND({ user }) {
  const navigate = useNavigate();

  const handleEditClick = (id) => {
    navigate(`/editUser/${id}`);
  };

  const handleDeleteClick = (id) => {
    navigate(`/delete-user/${id}`);
  };

  if (!user) {
    return <p>Không có dữ liệu người dùng</p>;
  }

  const handleAction = (action, userId) => {
    console.log(`Action: ${action} for user ID: ${userId}`);
  };

  return (
    <tr className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700">
      <td className="px-4 py-2 text-center">{user.taiKhoan}</td>
      <td className="px-4 py-2 text-center">{user.hoTen}</td>
      <td className="description px-4 py-2 text-center">{user.email}</td>
      <td className="px-4 py-2 text-center">{user.soDT}</td>

      <td className="px-4 py-2 text-center">{user.maLoaiNguoiDung}</td>
      <td className="px-4 py-2 text-center">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded mr-2"
          // onClick={() => handleDeleteClick(user.taiKhoan)}
        >
          Xóa
        </button>
        <button
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            onClick={() => handleEditClick(user.taiKhoan)}
          >
            Sửa
          </button>
      </td>
    </tr>
  );
}
