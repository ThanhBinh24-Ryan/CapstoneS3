import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { NavLink } from "react-router-dom";
import "./Sass/DangKy.scss"; // Đảm bảo bạn đã import file CSS

export default function IndexDangKy() {
  // Schema validation sử dụng Yup
  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Tài khoản không được để trống")
      .min(6, "Tài khoản phải có ít nhất 6 ký tự")
      .max(20, "Tài khoản không được quá 20 ký tự"),

    password: Yup.string()
      .required("Mật khẩu không được để trống")
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
      .matches(/[A-Z]/, "Mật khẩu phải chứa ít nhất 1 chữ cái in hoa")
      .matches(/[0-9]/, "Mật khẩu phải chứa ít nhất 1 chữ số"),

    confirmPassword: Yup.string()
      .required("Bạn phải xác nhận lại mật khẩu")
      .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp"),

    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Email không được để trống"),

    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Số điện thoại phải có 10 chữ số")
      .required("Số điện thoại không được để trống"),
  });

  // Hàm xử lý khi form được submit
  const handleSubmit = (values) => {
    console.log(values);
    // Thực hiện đăng ký (gửi dữ liệu lên server)
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <Formik
          initialValues={{
            username: "",
            password: "",
            confirmPassword: "",
            email: "",
            phone: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div>
              <label htmlFor="username">Tài khoản</label>
              <Field type="text" id="username" name="username" />
              <ErrorMessage
                name="username"
                component="div"
                className="error-message"
              />
            </div>

            <div>
              <label htmlFor="password">Mật khẩu</label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage
                name="password"
                component="div"
                className="error-message"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword">Nhập lại mật khẩu</label>
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="error-message"
              />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
              />
            </div>

            <div>
              <label htmlFor="phone">Số điện thoại</label>
              <Field type="text" id="phone" name="phone" />
              <ErrorMessage
                name="phone"
                component="div"
                className="error-message"
              />
            </div>

            <button type="submit">
              <NavLink
                to="DangNhap"
                className={({ isActive }) => (isActive ? "text-blue-700" : "")}
                aria-current="page"
              >
                Đăng ký
              </NavLink>
            </button>

            <div className="login-link">
              <p>
                Đã có tài khoản?{" "}
                <NavLink
                  to="DangNhap"
                  className={({ isActive }) =>
                    isActive ? "text-blue-700" : ""
                  }
                  aria-current="page"
                >
                  Đăng nhập
                </NavLink>
              </p>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
