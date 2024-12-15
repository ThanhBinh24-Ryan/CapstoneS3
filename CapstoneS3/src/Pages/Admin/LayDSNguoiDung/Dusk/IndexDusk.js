import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../API-Servise/Api-Servise";

// Async thunk để fetch danh sách người dùng
export const fetchNguoiDung = createAsyncThunk(
  "nguoiDung/fetchNguoiDung",  // Tên action
  async () => {
    try {
      const result = await api.get("QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01");
      console.log("Dữ liệu trả về từ API:", result);
      return result.data.content;  // Lấy dữ liệu trả về từ API
    } catch (error) {
      throw error;  // Trả về lỗi nếu có
    }
  }
);

// Initial state cho reducer
const initialState = {
  loading: false,
  data: [],
  error: null,
};

// Tạo slice cho danh sách người dùng
const nguoiDungReducer = createSlice({
  name: "nguoiDungReducer",  // Đổi tên thành 'nguoiDungReducer'
  initialState,
  reducers: {},  // Nếu không có reducers, có thể để trống
  extraReducers: (builder) => {
    builder.addCase(fetchNguoiDung.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchNguoiDung.fulfilled, (state, action) => {
      console.log("Dữ liệu sau khi fetch:", action.payload);
      state.loading = false;
      state.data = action.payload;  // Lưu data khi fetch thành công
    });
    builder.addCase(fetchNguoiDung.rejected, (state, action) => {
      state.loading = false;
      // Lưu lỗi từ action.error.message
      state.error = action.error?.message || "Có lỗi xảy ra";  
    });
  },
});

export default nguoiDungReducer.reducer;
