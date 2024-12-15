import React from "react";

export default function MovieItem({ cumRap, phim }) {
  if (!cumRap || !phim) {
    return <p>Không có dữ liệu hoặc dữ liệu không hợp lệ.</p>;
  }

  if (
    !phim.lstLichChieuTheoPhim ||
    !Array.isArray(phim.lstLichChieuTheoPhim) ||
    phim.lstLichChieuTheoPhim.length === 0
  ) {
    return <p>Không có lịch chiếu cho phim này.</p>;
  }

  return (
    <div className="w-28 mx-auto   p-4 mb-6 bg-white">
      <div className="flex">
        {/* Bên trái: Ảnh và tên phim */}
        <div className="w-1/3 flex flex-col items-center">
          <img
            src={phim.hinhAnh || "https://via.placeholder.com/150"}
            alt={phim.tenPhim || "Tên phim"}
            className="w-32 h-48 object-cover rounded-lg mb-2"
            style={{ margin: "10px 0" }}
          />
          <h5 className="text-lg font-bold text-gray-800 text-center">
            {phim.tenPhim || "Tên phim"}
          </h5>
        </div>

        {/* Bên phải: Thông tin lịch chiếu */}
        <div className="w-2/3 pl-4 overflow-x-auto">
          <div className="flex space-x-4">
            {phim.lstLichChieuTheoPhim.map((lichChieu, idx) => (
              <div
                key={idx}
                className="min-w-[150px] p-2 bg-gray-100 rounded-lg shadow-sm flex flex-col"
              >
                <p className="text-sm font-medium text-gray-700">
                  <strong>Rạp:</strong> {lichChieu.tenRap || "Tên rạp"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Ngày giờ:</strong>{" "}
                  {new Date(lichChieu.ngayChieuGioChieu).toLocaleString("vi-VN")}
                </p>
                <p className="text-sm text-green-600 font-medium">
                  <strong>Giá vé:</strong>{" "}
                  {lichChieu.giaVe
                    ? new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(lichChieu.giaVe)
                    : "N/A"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
