// src/store/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../API-Servise/Api-Servise"; // Đảm bảo apiService là đúng đường dẫn của bạn

// Define async thunk for login
export const actLogin = createAsyncThunk(
  "auth/login",
  async (user, { rejectWithValue }) => {
    try {
      const result = await api.post(
        "QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=GP04&soTrang=1&soPhanTuTrenTrang=20",
        user
      );
      
      const userInfo = result.data.content;

      if (userInfo.maLoaiNguoiDung === "QuanTri") {
        // Đăng nhập thành công, lưu vào localStorage
        localStorage.setItem("USER_ADMIN", JSON.stringify(userInfo));
      } else {
        // Người dùng không có quyền, trả về lỗi
        return rejectWithValue({
          data: {
            content: "Bạn không có quyền truy cập trang này!",
          },
        });
      }

      return result.data.content; // Trả về dữ liệu người dùng
    } catch (error) {
      return rejectWithValue(error.response); // Nếu API thất bại, trả về lỗi
    }
  }
);

// Khởi tạo giá trị mặc định
const initialState = {
  loading: false,
  data: JSON.parse(localStorage.getItem("USER_ADMIN")) || null,
  error: null,
};

const authReducer = createSlice({
  name: "authReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(actLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(actLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default authReducer.reducer;
