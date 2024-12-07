// listTTLichChieuSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../API-Servise/Api-Servise"; // Đảm bảo đúng đường dẫn API

// Fetch danh sách lịch chiếu từ API
export const fetchListLich = createAsyncThunk(
  "listLich/fetchListLich",
  async () => {
    try {
      const result = await api.get(
        "QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP04"
      );
      // Kiểm tra nếu dữ liệu có cấu trúc đúng không
      return result.data.content || []; // Trả về mảng rỗng nếu không có dữ liệu
    } catch (error) {
      console.error("Error fetching showtimes:", error.message);
      throw new Error(error.message);
    }
  }
);

// Initial state cho listTTLichChieuReducer
const initialState = {
  loading: false,
  data: [],  // Mảng lịch chiếu rỗng mặc định
  error: null,
};

// Slice Redux cho listTTLichChieu
const listLichReducer = createSlice({
  name: "listLichReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchListLich.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchListLich.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload; // Cập nhật data khi thành công
    });
    builder.addCase(fetchListLich.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message; // Cập nhật lỗi khi thất bại
    });
  },
});

export default listLichReducer.reducer;
