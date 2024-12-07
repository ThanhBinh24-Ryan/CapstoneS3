// ListMovie.jsx
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Movie from "../ListMovie/IndexListMovie"; // Đảm bảo đường dẫn đúng
import { fetchListMovie } from "../ListMovie/Dusk/IndexDusk"; // Đảm bảo đường dẫn đúng

export default function ListMovie() {
  const dispatch = useDispatch();

  // Destructuring state từ Redux
  const { loading, data, error } = useSelector(
    (state) => state.listMovie || {}
  );
  
  console.log(" day la", data);
  useEffect(() => {
    // Dispatch action để fetch dữ liệu khi component mount
    dispatch(fetchListMovie());
  }, [dispatch]);
  useEffect(() => {
    if (data) {
      console.log("Dữ liệu listLich trong Redux:", data); // In dữ liệu ra console
    }
  }, [data]);
  if (loading) return <p>Loading...</p>; // Hiển thị Loading nếu dữ liệu đang được tải

  if (error) return <p>Error: {error}</p>; // Hiển thị lỗi nếu có lỗi

  // Render danh sách phim nếu có dữ liệu
  const renderListMovie = () => {
    if (Array.isArray(data) && data.length > 0) {
      return data.map((movie) => <Movie key={movie.maPhim} movie={movie} />);
    } else {
      return <p>No movies available</p>; // Nếu không có phim nào
    }
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-4 gap-5">{renderListMovie()}</div>
    </div>
  );
}
