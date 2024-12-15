import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct } from '../DeleteProduct/Duck/IndexDusk';  // Đảm bảo đường dẫn đúng
import { useParams, useNavigate } from 'react-router-dom'; // Thay useHistory bằng useNavigate
import './sass/Sass.scss';

export default function IndexDeleteProduct() {
  const dispatch = useDispatch();
  const { id } = useParams(); 
  const { loading, error } = useSelector((state) => state.productDelete);  // Đảm bảo lấy từ state đúng tên slice
  const navigate = useNavigate();  
  useEffect(() => {
    // Kiểm tra ID từ URL và điều hướng nếu không hợp lệ
    if (!id) {
      alert('ID không hợp lệ!');
      navigate('/admin');  // Chuyển hướng về trang danh sách sản phẩm
    }
  }, [id, navigate]);

  // Hàm gọi action xóa sản phẩm khi người dùng nhấn nút
  const handleDelete = () => {
    if (id) {
      dispatch(deleteProduct(id));  
      console.log(id);
    }
  };

  return (
    <div className="delete-product-container">
      {/* Hiển thị thông báo lỗi nếu có */}
      {error && <div className="error-message">{error}</div>}

      {/* Nút Xóa sản phẩm */}
      <button
        className="text-center text-2xl"
        onClick={handleDelete}
        disabled={loading} // Disable nút khi đang loading
      >
        {loading ? 'Đang xóa...' : `Xóa sản phẩm ${id}`}
      </button>
    </div>
  );
}
