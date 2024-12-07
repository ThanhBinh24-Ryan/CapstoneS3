import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MovieItem from "../TTLichChieu/IndexTTLichChieu"; // Component hiển thị phim và cụm rạp
import { fetchListLich } from "../TTLichChieu/Dusk/IndexDusk"; // Thao tác fetch dữ liệu

export default function ListLich() {
  const dispatch = useDispatch();
  
  // Dữ liệu từ Redux Store
  const { loading, data, error } = useSelector((state) => state.listLich || {});
  
  useEffect(() => {
    // Dispatch action để fetch dữ liệu khi component mount
    dispatch(fetchListLich());
  }, [dispatch]);

  // Debugging dữ liệu từ Redux Store
  useEffect(() => {
    if (data) {
      console.log("Dữ liệu list lich chiếu:", data); // Kiểm tra dữ liệu trong Redux Store
    }
  }, [data]);

  // Nếu dữ liệu đang được tải, hiển thị Loading
  if (loading) return <p>Loading...</p>;
  
  // Nếu có lỗi trong quá trình fetch dữ liệu, hiển thị thông báo lỗi
  if (error) return <p>Error: {error}</p>;

  // Render danh sách phim và lịch chiếu
  const renderListLich = () => {
    if (Array.isArray(data) && data.length > 0) {
      return data.map((cumRap, index) => {
        console.log("Kiểm tra cumRap:", cumRap); 
        console.log("Kiểm tra cumRap có danh sách phim:", cumRap.danhSachPhim);  // Log toàn bộ đối tượng cumRap để kiểm tra
        // Kiểm tra sự tồn tại của 'danhSachPhim'
        if (!cumRap.danhSachPhim || !Array.isArray(cumRap.danhSachPhim) || cumRap.danhSachPhim.length === 0) {
          console.log(`Không có phim trong cụm rạp ${cumRap.tenCumRap} (maCumRap: ${cumRap.maCumRap})`);
          return <p key={index}>Không có phim trong cụm rạp này.</p>;
        }
  
        // Render danh sách phim trong cụm rạp
        return cumRap.danhSachPhim.map((phim) => {
          console.log("Thông tin phim:", phim);  // Log từng phim để kiểm tra
          return <MovieItem key={phim.maPhim} cumRap={cumRap} phim={phim} />;
        });
      });
    } else {
      console.log("Không có dữ liệu Lich chiếu");  // Log nếu không có dữ liệu
      return <p>No Lich available</p>;
    }
  };
  
  

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-semibold text-center mb-6">Danh sách Lịch Chiếu</h1>
      {renderListLich()}
    </div>
  );
}
