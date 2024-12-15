import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct } from "./Dusk/IndexDusk"; // Import action thêm sản phẩm
import './sass/AddNew.scss';
import moment from 'moment';

export default function AddProductPage() {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.addNewProduct); // Lấy thông tin từ Redux

  const [product, setProduct] = useState({
    tenPhim: "",
    moTa: "",
    ngayKhoiChieu: "",
    sapChieu: false,
    dangChieu: false,
    hot: false,
    hinhAnh: null,
    trailer: "",
    danhGia: 10,
  });

  // Hàm xử lý thay đổi input
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  // Hàm xử lý khi thay đổi file ảnh
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProduct({
      ...product,
      hinhAnh: file,
    });
  };

  // Hàm xử lý khi thay đổi trạng thái của toggle switch
  const handleSwitchChange = (e) => {
    const { name, checked } = e.target;
    setProduct({
      ...product,
      [name]: checked,
    });
  };

  // Khi loading, hiển thị spinner hoặc thông báo đang tải
  if (loading) {
    return <div>Đang tải...</div>;
  }
  
  // Khi có lỗi, hiển thị thông báo lỗi
  if (error) {
    return <div>Lỗi: {JSON.stringify(error)}</div>;
  }
  
  // Khi có dữ liệu, hiển thị thông tin về sản phẩm vừa thêm
  if (data) {
    return (
      <div>
        <h3 className="text-center font-bold text-2xl">Sản phẩm đã được thêm thành công</h3>
        
      </div>
    );
  }

  // Hàm submit dữ liệu
  const handleAddProduct = (e) => {
    e.preventDefault();
    
    // Format lại ngày chiếu trước khi gửi lên API
    const formattedDate = moment(product.ngayKhoiChieu, 'DD/MM/YYYY').format('DD/MM/YYYY');
    
    // Cập nhật lại giá trị ngày chiếu
    const updatedProduct = {
      ...product,
      ngayKhoiChieu: formattedDate,
    };

    // Gửi sản phẩm mới lên API
    dispatch(addNewProduct(updatedProduct));
  };

  return (
    <div className="dsphim first-letter:add-product-container">
      <div className="add-product-header">
        <h2>Thêm Sản Phẩm Mới</h2>
      </div>

      {/* Form to add product */}
      <form onSubmit={handleAddProduct}>
        <div className="form-group">
          <label>Tên Phim</label>
          <input
            type="text"
            name="tenPhim"
            value={product.tenPhim}
            onChange={handleOnChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Mô Tả</label>
          <textarea
            name="moTa"
            value={product.moTa}
            onChange={handleOnChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Ngày Khởi Chiếu</label>
          <input
            type="text"
            name="ngayKhoiChieu"
            value={product.ngayKhoiChieu}
            onChange={handleOnChange}
            placeholder="dd/MM/yyyy"
            required
          />
        </div>

        <div className="form-group">
          <label>Trailer</label>
          <input
            type="text"
            name="trailer"
            value={product.trailer}
            onChange={handleOnChange}
          />
        </div>

        <div className="form-group">
          <label>Đánh Giá</label>
          <input
            type="number"
            name="danhGia"
            value={product.danhGia}
            onChange={handleOnChange}
            min="1"
            max="10"
            required
          />
        </div>

      

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="sapChieu"
              checked={product.sapChieu}
              onChange={handleSwitchChange}
            />
            Sắp Chiếu
          </label>
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="dangChieu"
              checked={product.dangChieu}
              onChange={handleSwitchChange}
            />
            Đang Chiếu
          </label>
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="hot"
              checked={product.hot}
              onChange={handleSwitchChange}
            />
            Hot
          </label>
        </div>
        <div className="form-group">
          <label>Hình Ảnh</label>
          
          <input
            type="file"
            name="hinhAnh"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Thêm Sản Phẩm</button>
      </form>
    </div>
  );
}
