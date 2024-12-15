import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import IndexDS from "./IndexDS";  // Đảm bảo đúng đường dẫn tới component IndexDS
import { fetchDanhSach } from "../../Admin/LayDSPhim/Dusk/IndexDusk";  // Đảm bảo đúng đường dẫn tới action fetch
import './Sass/Layds.scss'
export default function RenderDS() {
  const dispatch = useDispatch();

  // Lấy dữ liệu từ Redux store
  const { loading, data, error } = useSelector((state) => state.RenderDS || {});
  console.log("Dữ liệu phim:", data);  // Kiểm tra dữ liệu trong console
  
  
  // Khi component mount, dispatch action để lấy dữ liệu
  useEffect(() => {
    dispatch(fetchDanhSach());
  }, [dispatch]);

  // Kiểm tra nếu đang loading hoặc có lỗi
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Kiểm tra xem dữ liệu có tồn tại và đúng định dạng
  if (!data || data.length === 0) {
    return <p>No data availablessssssssssssssssss</p>;
  }
  const TableHeader = () => (
    <thead className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
      <tr>
        <th className="px-4 py-2 text-center">Mã Phim</th>
        <th className="px-4 py-2 text-center">Tên Phim</th>
        <th className="px-4 py-2 text-center">Hình Ảnh</th>
        <th className="px-4 py-2 text-center">Mô Tả</th>
        <th className="px-4 py-2 text-center">Hành Động</th>
      </tr>
    </thead>
  );
  // Render danh sách phim nếu có dữ liệu
  const renderList = () => {
    if (Array.isArray(data) && data.length > 0) {
      return data.map((movie) => <IndexDS key={movie.maPhim} movie={movie} />);
    } else {
      return <p>No movies available</p>; // Nếu không có phim nào
    }
  };

  return (
    <div className=" container mx-auto p-5">
      <h2 className="text-2xl font-bold text-center mb-5">Danh Sách Phim</h2>
      <div className="dsphim overflow-x-auto">
        <table className="min-w-full table-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <TableHeader />
          <tbody className="">{renderList()}</tbody>
        </table>
      </div>
    </div>
  );
}
