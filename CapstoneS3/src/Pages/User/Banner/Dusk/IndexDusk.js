// listBannerReducer.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../API-Servise/Api-Servise";

// Async thunk để fetch danh sách banner
export const fetchListBanner = createAsyncThunk(
  "listBanner/fetchListBanner",
  async () => {
    try {
      const result = await api.get("QuanLyPhim/LayDanhSachBanner");
      return result.data.content;  // Lấy dữ liệu trả về từ API
    } catch (error) {
      return error;  // Trả về lỗi nếu có
    }
  }
);

// Initial state cho reducer
const initialState = {
  loading: false,
  data: null,
  error: null,
};

// Tạo slice cho danh sách banner
const listBannerReducer = createSlice({
  name: "listBanner",  // Đổi tên thành 'listBanner' để hợp lý hơn
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Các action để xử lý trạng thái khi fetch dữ liệu
    builder.addCase(fetchListBanner.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchListBanner.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;  // Lưu data khi fetch thành công
    });
    builder.addCase(fetchListBanner.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;  // Lưu lỗi nếu có
    });
  },
});

export default listBannerReducer.reducer;
