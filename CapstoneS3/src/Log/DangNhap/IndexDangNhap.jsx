import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actLogin } from "./Dusk/IndexDusk"; // Đảm bảo bạn import đúng action
import { useNavigate } from "react-router-dom";

export default function IndexDangNhap() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State lấy từ Redux
  const { loading, error } = useSelector((state) => state.IndexDangNhap);

  // Validation Schema với Yup
  const validationSchema = Yup.object({
    username: Yup.string().required("Tài khoản không được để trống"),
    password: Yup.string().required("Mật khẩu không được để trống"),
  });

  // Hàm xử lý khi form được submit
  const handleSubmit = (values) => {
    console.log(values);
    // Gọi action login từ Redux
    dispatch(actLogin(values))
      .then(() => {
        // Sau khi đăng nhập thành công, chuyển hướng tới trang chính (hoặc trang bạn muốn)
        navigate("/admin"); // Ví dụ chuyển đến trang dashboard
      })
      .catch((err) => {
        // Xử lý lỗi nếu đăng nhập thất bại
        console.error(err);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm relative">
        {/* Nút Close */}
        <NavLink
          to="/" // Chuyển hướng về trang chủ khi nhấn nút Close
          className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 text-gray-800 p-2 rounded-full focus:outline-none"
        >
          <span className="text-xl font-semibold">×</span>
        </NavLink>

        {/* Tiêu đề */}
        <h2 className="text-2xl font-semibold text-center mb-6">Đăng nhập</h2>

        {/* Formik Form */}
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              {/* Tài khoản */}
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tài khoản
                </label>
                <Field
                  type="text"
                  id="username"
                  name="username"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập tài khoản"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-sm text-red-600"
                />
              </div>

              {/* Mật khẩu */}
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mật khẩu
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập mật khẩu"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-sm text-red-600"
                />
              </div>

              {/* Lỗi đăng nhập từ Redux */}
              {error && (
                <div className="text-sm text-red-600 mb-4">
                  {error.data ? error.data.content : "Lỗi đăng nhập"}
                </div>
              )}

              {/* Nút Đăng nhập */}
              <div className="mb-4">
                <button
                  type="submit"
                  disabled={isSubmitting || loading}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                </button>
              </div>

              {/* Liên kết đăng ký */}
              <div className="text-center">
                <NavLink to="/register" className="text-blue-600 hover:underline">
                  Chưa có tài khoản? Đăng ký
                </NavLink>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}