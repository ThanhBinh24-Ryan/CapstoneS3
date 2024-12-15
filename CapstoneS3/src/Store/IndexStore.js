// store.js
import { configureStore } from "@reduxjs/toolkit";
import listBannerReducer from "../Pages/User/Banner/Dusk/IndexDusk";
import listMovieReducer from "../Pages/User/ListMovie/Dusk/IndexDusk"
import listHTRap from "../Pages/User/HeThongRap/Dusk/IndexDusk"
import listLichReducer from "../Pages/User/TTLichChieu/Dusk/IndexDusk"
import nguoiDungReducer from "../Pages/Admin/LayDSNguoiDung/Dusk/IndexDusk"
import authReducer from "../Log/DangNhap/Dusk/IndexDusk"
import danhSachReducer from "../Pages/Admin/LayDSPhim/Dusk/IndexDusk"
import addNewProductReducer from "../Pages/Admin/AddNew/Dusk/IndexDusk"; 
import editProductSlice from "../Pages//Admin//EditProduct/Dusk/IndexDusk"
import productSlice from "../Pages/Admin/DeleteProduct/Duck/IndexDusk"
import addNewUserReducer from "../Pages/Admin/AddUser/Dusk/IndexDusk"
import editUserSlice from "../Pages/Admin/UpdateUser/Dusk/IndexDuck"
import registerUserReducer from "../Log/DangKy/Dusk/IndexDusk"

const store = configureStore({
  reducer: {
    listBanner: listBannerReducer,
    listMovie: listMovieReducer,
    IndexHTRap: listHTRap,
    listLich: listLichReducer,
    IndexDangNhap: authReducer,
    RenderDS: danhSachReducer,
    addNewProduct: addNewProductReducer,
    product: editProductSlice,
    productDelete:productSlice ,
    nguoiDungReducer: nguoiDungReducer,
    addNewUser: addNewUserReducer,
    editUser: editUserSlice,
    registerUser: registerUserReducer,

  },
  devTools: process.env.NODE_ENV !== "production", 
  
  // Kích hoạt DevTools khi ở môi trường phát triển
});

export default store;
