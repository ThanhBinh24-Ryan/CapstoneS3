import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../DangKy/Dusk/IndexDusk"; // Đảm bảo đường dẫn đúng đến action
import "./Sass/DangKy.scss"; // Đảm bảo bạn đã import file CSS đúng
import { Link } from "react-router-dom";

export default function IndexDangKy() {
  const dispatch = useDispatch();
  const { loading, error, notification } = useSelector(
    (state) => state.registerUser
  );

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    phone: "",
    maNhom: "GP01", // Mã nhóm mặc định
    hoTen: "",
  });

  const [errors, setErrors] = useState({});

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Xác thực form
  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Tài khoản không được để trống";
    if (!formData.password) newErrors.password = "Mật khẩu không được để trống";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Mật khẩu không khớp";
    if (!formData.email) newErrors.email = "Email không được để trống";
    if (!formData.phone) newErrors.phone = "Số điện thoại không được để trống";
    if (!formData.hoTen) newErrors.hoTen = "Họ tên không được để trống";
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const userData = {
      taiKhoan: String(formData.username),
      matKhau: String(formData.password),
      email: String(formData.email),
      soDt: String(formData.phone),
      maNhom: String(formData.maNhom),
      hoTen: String(formData.hoTen),
    };

    dispatch(registerUser(userData));
  };

  return (
    <div className="form-wrapper">
      <div className="form-container scrollable-form">
        <h2 className="form-title">Đăng Ký Tài Khoản</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Tài khoản</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <div className="error-message">{errors.username}</div>}
          </div>

          <div>
            <label>Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>

          <div>
            <label>Nhập lại mật khẩu</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <div className="error-message">{errors.confirmPassword}</div>
            )}
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>

          <div>
            <label>Số điện thoại</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <div className="error-message">{errors.phone}</div>}
          </div>

          <div>
            <label>Họ tên</label>
            <input
              type="text"
              name="hoTen"
              value={formData.hoTen}
              onChange={handleChange}
            />
            {errors.hoTen && <div className="error-message">{errors.hoTen}</div>}
          </div>

          <div>
            <label>Mã nhóm</label>
            <input
              type="text"
              name="maNhom"
              value={formData.maNhom}
              onChange={handleChange}
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Đang đăng ký..." : "Đăng ký"}
          </button>

          {/* Hiển thị thông báo thành công và lỗi */}
          {notification && (
            <div className="success-message">{notification}</div>
          )}
          {error && (
            <div className="error-message">
              {typeof error === "object" ? JSON.stringify(error) : error}
            </div>
          )}

          <div className="login-link">
            <p>
              Đã có tài khoản?{" "}
              <Link to="/DangNhap" className="text-blue-700">
                Đăng nhập
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
