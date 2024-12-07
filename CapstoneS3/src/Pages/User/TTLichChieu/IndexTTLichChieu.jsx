import React from 'react';

export default function MovieItem({ cumRap, phim }) {
  // Kiểm tra nếu không có dữ liệu hoặc dữ liệu không hợp lệ
  if (!cumRap || !phim) {
    return <p>Không có dữ liệu hoặc dữ liệu không hợp lệ.</p>;
  }

  // Kiểm tra nếu không có danh sách phim hoặc lịch chiếu
  if (!phim.lstLichChieuTheoPhim || !Array.isArray(phim.lstLichChieuTheoPhim) || phim.lstLichChieuTheoPhim.length === 0) {
    return <p>Không có lịch chiếu cho phim này.</p>;
  }

  return (
    <div className="movie-item">
      {/* Hiển thị Logo của hệ thống rạp */}
      <div className="flex items-center mb-4">
        <img
          src={cumRap.logo}
          alt={cumRap.tenHeThongRap}
          className="w-12 h-12 mr-2"
        />
        <h3 className="text-xl font-semibold">{cumRap.tenHeThongRap}</h3>
      </div>

      {/* Hiển thị hình ảnh của phim */}
      <img
        src={phim.hinhAnh}
        alt={phim.tenPhim}
        className="w-full h-56 object-cover"
      />

      {/* Tên phim */}
      <h5 className="text-xl font-bold">{phim.tenPhim}</h5>

      {/* Hiển thị các lịch chiếu cho phim */}
      <div className="lich-chieu-list">
        {phim.lstLichChieuTheoPhim.map((lichChieu, idx) => (
          <div key={idx} className="lich-chieu-item">
            <p>{lichChieu.tenRap}</p>
            <p>{new Date(lichChieu.ngayChieuGioChieu).toLocaleString()}</p>
            <p>Giá vé: {lichChieu.giaVe} VNĐ</p>
          </div>
        ))}
      </div>
    </div>
  );
}
