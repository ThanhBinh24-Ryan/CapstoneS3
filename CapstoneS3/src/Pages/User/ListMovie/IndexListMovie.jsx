import { Link } from "react-router-dom";

export default function Movie({ movie }) {
  
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img
        className="rounded-t-lg w-full h-56 object-cover"
        src={movie.hinhAnh}
        alt={movie.tenPhim || "Movie poster"} // Cung cấp alt text hợp lý cho SEO và accessibility
      
      />

      <div className="p-5">
        <Link to={`${movie.maPhim}`}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {movie.tenPhim}
          </h5>
        </Link>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Đánh Giá: {movie.danhGia} ⭐
          </h5>
      </div>
    </div>
  );
}
