import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUserByTaiKhoan, editUser, resetUserState } from "../UpdateUser/Dusk/IndexDuck"; // Cập nhật đường dẫn import cho chính xác
import { useParams } from "react-router-dom"; // Để lấy tham số URL nếu tài khoản được truyền qua route

export default function UpdateUser() {
  const dispatch = useDispatch();
  const { taiKhoan } = useParams(); // Lấy tài khoản từ URL params (nếu có)

  const { data, loading, error, notification } = useSelector((state) => state.editUser);

  // State để lưu dữ liệu người dùng
  const [userData, setUserData] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "",
    maLoaiNguoiDung: "",
    hoTen: "",
  });

  // Lấy thông tin người dùng khi tài khoản thay đổi (hoặc lần đầu tiên)
  useEffect(() => {
    if (taiKhoan) {
      dispatch(fetchUserByTaiKhoan(taiKhoan)); // Gửi yêu cầu lấy dữ liệu người dùng theo tài khoản
    }
    return () => {
      dispatch(resetUserState()); // Reset lại state khi component unmount
    };
  }, [dispatch, taiKhoan]); // Gọi lại mỗi khi tài khoản thay đổi

  // Cập nhật state userData khi nhận được dữ liệu từ API
  useEffect(() => {
    if (data) {
      setUserData({
        taiKhoan: data.taiKhoan,
        matKhau: data.matKhau,
        email: data.email,
        soDt: data.soDt,
        maNhom: data.maNhom,
        maLoaiNguoiDung: data.maLoaiNguoiDung,
        hoTen: data.hoTen,
      });
    }
  }, [data]);

  // Handle sự thay đổi trong các input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // Xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editUser(userData)); // Gửi yêu cầu chỉnh sửa thông tin người dùng
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {notification && <p className="success-message">{notification}</p>}
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="taiKhoan"
          value={userData.taiKhoan}
          onChange={handleChange}
          placeholder="Tài Khoản"
          disabled // Không cho phép chỉnh sửa tài khoản
        />
        <input
          type="password"
          name="matKhau"
          value={userData.matKhau}
          onChange={handleChange}
          placeholder="Mật Khẩu"
        />
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="text"
          name="soDt"
          value={userData.soDt}
          onChange={handleChange}
          placeholder="Số điện thoại"
        />
        <input
          type="text"
          name="maNhom"
          value={userData.maNhom}
          onChange={handleChange}
          placeholder="Mã nhóm"
        />
        <input
          type="text"
          name="maLoaiNguoiDung"
          value={userData.maLoaiNguoiDung}
          onChange={handleChange}
          placeholder="Mã loại người dùng"
        />
        <input
          type="text"
          name="hoTen"
          value={userData.hoTen}
          onChange={handleChange}
          placeholder="Họ Tên"
        />
        <button type="submit">Cập Nhật</button>
      </form>
    </div>
  );
}
