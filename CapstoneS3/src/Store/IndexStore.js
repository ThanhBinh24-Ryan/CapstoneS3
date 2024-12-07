// store.js
import { configureStore } from "@reduxjs/toolkit";
import listBannerReducer from "../Pages/User/Banner/Dusk/IndexDusk";
import listMovieReducer from "../Pages/User/ListMovie/Dusk/IndexDusk"
import listHTRap from "../Pages/User/HeThongRap/Dusk/IndexDusk"
import listLichReducer from "../Pages/User/TTLichChieu/Dusk/IndexDusk"
// import ListLich from "../Pages/User/TTLichChieu/RenderTTLichChieu";
import authReducer from "../Log/DangNhap/Dusk/IndexDusk"
import danhSachReducer from "../Pages/Admin/LayDSPhim/Dusk/IndexDusk"
const store = configureStore({
  reducer: {
    listBanner: listBannerReducer,
    listMovie: listMovieReducer,
    IndexHTRap: listHTRap,
    listLich: listLichReducer,
    IndexDangNhap: authReducer,
    RenderDS: danhSachReducer,
  },
  devTools: process.env.NODE_ENV !== "production", 
  
  // Kích hoạt DevTools khi ở môi trường phát triển
});

export default store;
