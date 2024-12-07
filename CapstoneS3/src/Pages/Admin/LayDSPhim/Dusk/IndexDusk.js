import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../API-Servise/Api-Servise";

// Async thunk để fetch danh sách (DanhSach)
export const fetchDanhSach = createAsyncThunk(
  "danhSach/fetchDanhSach",  // Tên action sẽ thay đổi thành 'danhSach'
  async () => {
    try {
      const result = await api.get("QuanLyPhim/LayDanhSachPhim?maNhom=GP01");
      console.log("Dữ liệu trả về từ API:", result);
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

// Tạo slice cho danh sách
const danhSachReducer = createSlice({
  name: "danhSachReducer",  // Đổi tên thành 'danhSach'
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Các action để xử lý trạng thái khi fetch dữ liệu
    builder.addCase(fetchDanhSach.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchDanhSach.fulfilled, (state, action) => {
      console.log("Dữ liệu sau khi fetch:", action.payload);
      state.loading = false;
      state.data = action.payload;  // Lưu data khi fetch thành công
    });
    builder.addCase(fetchDanhSach.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;  // Lưu lỗi nếu có
    });
  },
});

export default danhSachReducer.reducer;
