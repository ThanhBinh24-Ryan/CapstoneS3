// EditProductPage.js

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProduct, fetchProductById } from "./Dusk/IndexDusk"; // Đảm bảo import đúng actions
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import "./sass/Sass.scss";

export default function EditProductPage() {
  const dispatch = useDispatch();
  const { id } = useParams(); // Lấy `id` từ URL
  const { loading, data, error, notification } = useSelector((state) => state.product); // Lấy thông báo và trạng thái loading từ Redux
  const [product, setProduct] = useState({
    id: null,
    tenPhim: "",
    moTa: "",
    ngayKhoiChieu: "",
    sapChieu: false,
    dangChieu: false,
    hot: false,
    hinhAnh: null,
    trailer: "",
    danhGia: "",
  });

  const navigate = useNavigate();

  // Lắng nghe sự thay đổi của success để điều hướng về trang admin khi thành công
  useEffect(() => {
    if (notification) {
      alert(notification); // Hiển thị thông báo thành công
      navigate("/admin"); // Chuyển hướng về trang admin khi thành công
    }
  }, [notification, navigate]);

  // Lấy thông tin sản phẩm khi có `id`
  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id)); // Gọi action để fetch thông tin sản phẩm
    }
  }, [id, dispatch]);

  // Cập nhật state khi dữ liệu phim đã được tải về
  useEffect(() => {
    if (data) {
      setProduct({
        ...data,
        ngayKhoiChieu: moment(data.ngayKhoiChieu).format("YYYY-MM-DD"), // Định dạng ngày
      });
    }
  }, [data]);

  // Hàm xử lý thay đổi input
  const handleOnChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setProduct({
        ...product,
        [name]: checked,
      });
    } else if (type === "file") {
      const file = files[0] ? files[0] : null;
      const fileUrl = URL.createObjectURL(file);

      setProduct({
        ...product,
        hinhAnh: fileUrl,
      });
    } else {
      setProduct({
        ...product,
        [name]: value,
      });
    }
  };

  // Hàm xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editProduct(product)); // Gọi action để chỉnh sửa sản phẩm
  };

  return (
    <div className="editProduct-container pl-10">
      <h2 className="editProduct-title text-center text-2xl font-bold pt-3">Edit Product</h2>

      {/* Hiển thị Spinner khi loading */}
      {loading && (
        <div className="loading-spinner">
          <div className="spinner text-center font-bold text-3xl">Loading...</div>
        </div>
      )}

      <form className="editProduct-form" onSubmit={handleSubmit}>
        <div className="editProduct-form-group">
          <label className="editProduct-form-label" htmlFor="tenPhim">
            Tên Phim:
          </label>
          <input
            className="editProduct-form-input"
            id="tenPhim"
            type="text"
            name="tenPhim"
            value={product.tenPhim}
            onChange={handleOnChange}
          />
        </div>
        <div className="editProduct-form-group">
          <label className="editProduct-form-label" htmlFor="moTa">
            Mô Tả:
          </label>
          <textarea
            className="editProduct-form-textarea"
            id="moTa"
            name="moTa"
            value={product.moTa}
            onChange={handleOnChange}
          />
        </div>
        <div className="editProduct-form-group">
          <label className="editProduct-form-label" htmlFor="ngayKhoiChieu">
            Ngày Khởi Chiếu:
          </label>
          <input
            className="editProduct-form-input"
            id="ngayKhoiChieu"
            type="date"
            name="ngayKhoiChieu"
            value={product.ngayKhoiChieu}
            onChange={handleOnChange}
          />
        </div>
        <div className="editProduct-form-group">
          <label className="editProduct-form-label">Sắp Chiếu:</label>
          <input
            className="editProduct-form-checkbox"
            type="checkbox"
            name="sapChieu"
            checked={product.sapChieu}
            onChange={handleOnChange}
          />
        </div>
        <div className="editProduct-form-group">
          <label className="editProduct-form-label">Đang Chiếu:</label>
          <input
            className="editProduct-form-checkbox"
            type="checkbox"
            name="dangChieu"
            checked={product.dangChieu}
            onChange={handleOnChange}
          />
        </div>
        <div className="editProduct-form-group">
          <label className="editProduct-form-label">Hot:</label>
          <input
            className="editProduct-form-checkbox"
            type="checkbox"
            name="hot"
            checked={product.hot}
            onChange={handleOnChange}
          />
        </div>
        <div className="editProduct-form-group">
          <label className="editProduct-form-label" htmlFor="trailer">
            Trailer:
          </label>
          <input
            className="editProduct-form-input"
            id="trailer"
            type="text"
            name="trailer"
            value={product.trailer}
            onChange={handleOnChange}
          />
        </div>
        <div className="editProduct-form-group">
          <label className="editProduct-form-label" htmlFor="hinhAnh">
            Hình Ảnh:
          </label>
          <input
            className="editProduct-form-input"
            id="hinhAnh"
            type="file"
            name="hinhAnh"
            onChange={handleOnChange}
          />
          <div>
            <img src={product.hinhAnh} alt="Product" width="100" />
          </div>
        </div>
        <div className="editProduct-form-group">
          <label className="editProduct-form-label" htmlFor="danhGia">
            Đánh Giá:
          </label>
          <input
            className="editProduct-form-input"
            id="danhGia"
            type="number"
            name="danhGia"
            min="0"
            max="10"
            value={product.danhGia}
            onChange={handleOnChange}
          />
        </div>

        <button type="submit" className="editProduct-submit-btn">
          Cập Nhật
        </button>
      </form>
    </div>
  );
}
