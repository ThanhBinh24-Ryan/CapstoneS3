import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../API-Servise/Api-Servise";

// Async thunk để fetch danh sách hệ thống rạp (listHTRap)
export const fetchListHTRap = createAsyncThunk(
  "listHTRap/fetchListHTRap",  // Tên action sẽ thay đổi thành 'listHTRap'
  async () => {
    try {
      const result = await api.get("QuanLyRap/LayThongTinHeThongRap");
      return result.data.content;  // Lấy dữ liệu trả về từ API
    } catch (error) {
      return error;  // Trả về lỗi nếu có
    }
  }
);

// Initial state cho reducer
const initialState = {
  loading: false,
  data: [],
  error: null,
};

// Tạo slice cho danh sách hệ thống rạp
const listHTRapReducer = createSlice({
  name: "listHTRap",  // Đổi tên thành 'listHTRap'
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Các action để xử lý trạng thái khi fetch dữ liệu
    builder.addCase(fetchListHTRap.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchListHTRap.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;  // Lưu data khi fetch thành công
    });
    builder.addCase(fetchListHTRap.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;  // Lưu lỗi nếu có
    });
  },
});

export default listHTRapReducer.reducer;
