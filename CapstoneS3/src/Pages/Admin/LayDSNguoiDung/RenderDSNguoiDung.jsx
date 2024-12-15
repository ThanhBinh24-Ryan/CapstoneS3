import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import IndexDSND from "./IndexDSNguoiDung"; // Đảm bảo đúng đường dẫn tới component IndexDS
import { fetchNguoiDung } from "../../Admin/LayDSNguoiDung/Dusk/IndexDusk"; // Dùng đúng tên action
import "./Sass/Layds.scss";
import { NavLink } from "react-router-dom";
export default function RenderDSND() {
  const dispatch = useDispatch();

  // Lấy dữ liệu từ Redux store
  const { loading, data, error } = useSelector(
    (state) => state.nguoiDungReducer || {}
  );
  console.log("Dữ liệu người dùng:", data); // Kiểm tra dữ liệu trong console

  // Khi component mount, dispatch action để lấy dữ liệu
  useEffect(() => {
    dispatch(fetchNguoiDung());
  }, [dispatch]);

  // Kiểm tra nếu đang loading hoặc có lỗi
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Kiểm tra xem dữ liệu có tồn tại và đúng định dạng
  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  const TableHeader = () => (
    <thead className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
      <tr>
        <th className="px-4 py-2 text-center">Tài Khoản</th>
        <th className="px-4 py-2 text-center">Họ Tên</th>
        <th className="px-4 py-2 text-center">Email</th>
        <th className="px-4 py-2 text-center">Số Điện Thoại</th>
      
        <th className="px-4 py-2 text-center">Loại Người Dùng</th>
        <th className="px-4 py-2 text-center">Hành Động</th>
      </tr>
    </thead>
  );

  // Render danh sách người dùng nếu có dữ liệu
  const renderList = () => {
    if (Array.isArray(data) && data.length > 0) {
      return data.map((user) => <IndexDSND key={user.taiKhoan} user={user} />);
    } else {
      return <p>No users available</p>; // Nếu không có người dùng nào
    }
  };

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-bold text-center mb-5">
        Danh Sách Người Dùng
      </h2>
      <div>
        <NavLink to="/AddUser">
        <button className="border-solid p-2 bg-teal-400">Them nguoi dung</button>
        </NavLink>
      </div>
        
        <div>
          <input type="text" className="w-max py-10" placeholder="Nhap tai khoan" />
        </div>
  

      <div className="dsphim overflow-x-auto">
        <table className=" dsphim min-w-full table-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <TableHeader />
          <tbody className="dsphim">{renderList()}</tbody>
        </table>
      </div>
    </div>
  );
}
