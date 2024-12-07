import React, { useState, useEffect } from 'react';

export default function RenderBanner({ banners }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Tự động chuyển banner mỗi 3 giây
  useEffect(() => {
    if (banners && banners.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length); // Chuyển banner tự động
      }, 3000); // Thay đổi mỗi 3 giây

      return () => clearInterval(interval); // Cleanup khi component unmount
    }
  }, [banners]);

  // Kiểm tra nếu không có banner nào để hiển thị
  if (!banners || banners.length === 0) {
    return <div>No banners available</div>;
  }

  // Hàm chuyển sang banner tiếp theo
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length); // Chuyển sang banner tiếp theo
  };

  // Hàm chuyển sang banner trước đó
  const goToPrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + banners.length) % banners.length // Chuyển sang banner trước
    );
  };

  return (
    <div
      id="default-carousel"
      className="relative w-full overflow-hidden" // Thêm overflow-hidden để ẩn phần không cần thiết
      data-carousel="slide"
    >
      <div className="relative h-56 md:h-96">
        {/* Flexbox để xếp các banner ngang và di chuyển chúng */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`, // Di chuyển từ phải sang trái
          }}
        >
          {banners.map((banner, index) => (
            <div
              key={banner.maBanner}  // Sử dụng maBanner làm key thay vì index
              className="flex-shrink-0 w-full h-full"
            >
              <img
                src={banner.hinhAnh} // Sử dụng URL hình ảnh từ API
                alt={`Banner ${index + 1}`}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Nút điều khiển để chuyển banner */}
      <button
        onClick={goToPrev}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 px-4 py-2 bg-gray-500 text-white"
      >
        Prev
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 px-4 py-2 bg-gray-500 text-white"
      >
        Next
      </button>
    </div>
  );
}
