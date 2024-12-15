import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchListLich } from "../TTLichChieu/Dusk/IndexDusk";

export default function ListLich() {
  const dispatch = useDispatch();

  // Lấy dữ liệu từ Redux Store
  const { loading, data, error } = useSelector((state) => state.listLich || {});

  useEffect(() => {
    dispatch(fetchListLich());
  }, [dispatch]);

  // Render danh sách lịch chiếu
  const renderListLich = () => {
    if (!data || data.length === 0) return <p>Không có dữ liệu lịch chiếu.</p>;

    return (
      <div
        className="overflow-y-auto border rounded-lg shadow-md bg-white"
        style={{ maxHeight: "600px" }} // Chiều cao cố định
      >
        {data.map((heThongRap, index) => (
          <div key={index} className="mb-8">
            {/* Tên Hệ Thống Rạp */}
            <h2 className="text-2xl font-bold mb-4 px-4">
              {heThongRap.tenHeThongRap}
            </h2>

            {/* Danh sách cụm rạp */}
            {heThongRap.lstCumRap.map((cumRap, cumRapIndex) => (
              <div key={cumRapIndex} className="flex mb-6">
                {/* Bên trái: Hình ảnh và tên phim */}
                <div className="w-1/3 border-r p-4 bg-gray-50">
                  {cumRap.danhSachPhim.map((phim, phimIndex) => (
                    <div key={phimIndex} className="mb-6">
                      <img
                        src={phim.hinhAnh}
                        alt={phim.tenPhim}
                        className="w-20 h-28 object-cover rounded-lg mb-2"
                      />
                      <p className="text-sm font-semibold text-center">
                        {phim.tenPhim}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Bên phải: Lịch chiếu */}
                <div className="w-2/3 p-4">
                  {cumRap.danhSachPhim.map((phim) => (
                    <div key={phim.maPhim} className="mb-4">
                      <h3 className="text-lg font-semibold mb-2">
                        {phim.tenPhim}
                      </h3>
                      <div className="flex flex-wrap gap-4">
                        {phim.lstLichChieuTheoPhim.map((lichChieu, idx) => (
                          <div
                            key={idx}
                            className="bg-gray-100 px-4 py-2 rounded-lg text-green-600 font-medium"
                          >
                            {new Date(
                              lichChieu.ngayChieuGioChieu
                            ).toLocaleTimeString("vi-VN", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-semibold text-center mb-6">Lịch Chiếu Phim</h1>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        renderListLich()
      )}
    </div>
  );
}
