import React from "react";
import "./Sass/Layds.scss";
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { deleteProduct } from '../DeleteProduct/Duck/IndexDusk';
export default function IndexDS({ movie }) {
  const navigate = useNavigate();

  const handleEditClick = (id) => {
    // Điều hướng đến /editProduct/:id mà không có tiền tố admin
    navigate(`/editProduct/${id}`);
  };
  const handleDeleteClick = (id) => {
    // Điều hướng đến /editProduct/:id mà không có tiền tố admin
    navigate(`/delete-product/${id}`);
  
  };
  // Kiểm tra nếu movie có dữ liệu
  if (!movie) {
    return <p>Không có dữ liệu phim</p>; // Nếu không có dữ liệu, trả về thông báo lỗi
  }

  // Hàm để xử lý hành động (Xóa, Sửa, Lịch)
  const handleAction = (action, movieId) => {
    console.log(`Action: ${action} for movie ID: ${movieId}`);
    // Các logic xử lý cho từng hành động có thể được đặt tại đây
  };

  return (
    <tr className=" bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700">
      <td className="px-4 py-2 text-center">{movie.maPhim}</td>
      <td className="px-4 py-2 text-center description">{movie.tenPhim}</td>
      <td className="px-4 py-2 text-center">
        <img
          src={movie.hinhAnh}
          alt={movie.tenPhim}
          className="w-16 h-16 object-cover rounded-md"
        />
      </td>
      <td className="px-4 py-2 text-left max-w-xs description">
        {movie.moTa || "Không có mô tả"}
      </td>
      <td className="px-4 py-2 text-center">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded mr-2"
          onClick={() => handleDeleteClick( movie.maPhim)}
        >
          Xóa
        </button>
   
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            onClick={() => handleEditClick(movie.maPhim)}
          >
            Sửa
          </button>
     

        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => handleAction("Lịch", movie.maPhim)}
        >
          Thông tin
        </button>
      </td>
    </tr>
  );
}
