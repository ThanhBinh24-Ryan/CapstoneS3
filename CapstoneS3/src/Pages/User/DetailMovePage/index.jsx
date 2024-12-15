import { useParams } from "react-router-dom";
import { fetchDetailMovie } from "./duck/reducer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import IndexHTRap from "../HeThongRap/IndexHTRap";
import ListLich from "../TTLichChieu/RenderTTLichChieu";
export default function DetailMoviePage() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state) => state.detailMovieReducer
  );
  const { id } = useParams();

  // Fetch chi tiết phim khi component mount
  useEffect(() => {
    dispatch(fetchDetailMovie(id));
  }, [dispatch, id]);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">Đang tải...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <p className="text-xl">{error}</p>
      </div>
    );
  }

  // Render thông tin chi tiết phim
  return (
    <div>
      <div className="container mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Chi Tiết Phim
        </h1>

        {data && (
          <div className="flex flex-col md:flex-row items-center md:items-start">
            {/* Phần Ảnh Bên Trái */}
            <div className="w-full md:w-1/3 mb-6 md:mb-0 flex justify-center">
              <img
                src={data.hinhAnh}
                alt={data.tenPhim}
                className="w-64 h-96 object-cover rounded-lg shadow-md"
              />
            </div>

            {/* Phần Thông Tin Bên Phải */}
            <div className="w-full md:w-2/3 md:pl-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                {data.tenPhim}
              </h2>
              <p className="text-gray-600 mb-4">{data.moTa}</p>
              <p className="text-gray-700">
                <span className="font-medium">Ngày khởi chiếu: </span>
                {new Date(data.ngayKhoiChieu).toLocaleDateString("vi-VN")}
              </p>
              <p className="text-gray-700 mt-2">
                <span className="font-medium">Đánh giá: </span>
                {data.danhGia || "Chưa có đánh giá"}
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="flex">
        <div className="pt-3 px-5">
          <IndexHTRap />
        </div>
        <div className="pl-4">
          <ListLich />
        </div>
      </div>
    </div>
  );
}
