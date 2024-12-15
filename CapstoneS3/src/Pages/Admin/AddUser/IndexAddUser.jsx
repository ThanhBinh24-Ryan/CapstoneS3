import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewUser } from "./Dusk/IndexDusk"; // Import action thêm người dùng
import { NavLink, useNavigate } from "react-router-dom";
import moment from 'moment';

export default function AddUserPage() {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.addNewUser); // Lấy thông tin từ Redux
  const navigate = useNavigate();  // Khởi tạo useNavigate
  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maLoaiNguoiDung: "KhachHang",  // Mặc định là khách hàng, có thể thay đổi tùy theo yêu cầu
    hoTen: "",
  });

  // Hàm xử lý thay đổi input
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  // Hàm xử lý khi submit dữ liệu
  const handleAddUser = (e) => {
    e.preventDefault();
    
    // Gửi người dùng mới lên API
    dispatch(addNewUser(user));
  };

  // Khi loading, hiển thị spinner hoặc thông báo đang tải
  if (loading) {
    return <div>Đang tải...</div>;
  }
  
  // Khi có lỗi, hiển thị thông báo lỗi
  if (error) {
    return <div>Lỗi: {JSON.stringify(error)}</div>;
  }
  

//  if (data) {
//     // Sau khi thêm thành công, điều hướng về trang admin (có thể chỉnh lại đường dẫn nếu cần)
//     setTimeout(() => {
//       navigate("/DSNguoiDung");  // Thay "/admin" bằng đường dẫn của trang Admin
//     }, 1000); 
    // return (
    //   <div>
    //     <h3 className="text-center font-bold text-2xl">Người dùng đã được thêm thành công</h3>
    //   </div>
    // );
//   }
  return (
    <div className="add-user-container">
       <NavLink to="/DSNguoiDung"><h1 className="pl-3 text-red-700 font-bold text-xl"> Back </h1></NavLink>
      <div className="add-user-header">
        <h2 className=" text-center text-2xl font-bold">Thêm Người Dùng Mới</h2>
      </div>

      {/* Form to add user */}
      <form onSubmit={handleAddUser}>
        <div className="form-group">
          <label>Tài Khoản</label>
          <input
            type="text"
            name="taiKhoan"
            value={user.taiKhoan}
            onChange={handleOnChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Mật Khẩu</label>
          <input
            type="password"
            name="matKhau"
            value={user.matKhau}
            onChange={handleOnChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleOnChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Số Điện Thoại</label>
          <input
            type="text"
            name="soDt"
            value={user.soDt}
            onChange={handleOnChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Họ Tên</label>
          <input
            type="text"
            name="hoTen"
            value={user.hoTen}
            onChange={handleOnChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Loại Người Dùng</label>
          <select
            name="maLoaiNguoiDung"
            value={user.maLoaiNguoiDung}
            onChange={handleOnChange}
          >
            <option value="KhachHang">Khách Hàng</option>
            <option value="QuanTri">Quản Trị</option>
          </select>
        </div>

        <button type="submit">Thêm Người Dùng</button>
      </form>
    </div>
  );
}
