import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../../API-Servise/Api-Servise"; // Đảm bảo đường dẫn chính xác

// Thunk fetch chi tiết phim
export const fetchDetailMovie = createAsyncThunk(
  "detail/fetchDetailMovie",
  async (id, { rejectWithValue }) => {
    try {
      // Gửi request đến API với id phim
      const result = await api.get(`QuanLyPhim/LayThongTinPhim?MaPhim=${id}`);

      // Trả về dữ liệu content từ API
      return result.data.content;
    } catch (error) {
      // Xử lý lỗi và chỉ trả về thông báo lỗi đơn giản
      return rejectWithValue(
        error.response?.data?.message || "Có lỗi xảy ra khi lấy thông tin phim."
      );
    }
  }
);

// Trạng thái ban đầu của reducer
const initialState = {
  loading: false,
  data: null, // Dữ liệu chi tiết phim
  error: null, // Thông báo lỗi (nếu có)
};

// Slice chi tiết phim
const detailMovieReducer = createSlice({
  name: "detailMovieReducer",
  initialState,
  reducers: {}, // Không có reducers đồng bộ trong slice này
  extraReducers: (builder) => {
    // Xử lý trạng thái pending
    builder.addCase(fetchDetailMovie.pending, (state) => {
      state.loading = true; // Bắt đầu tải dữ liệu
      state.error = null; // Reset lỗi
    });

    // Xử lý khi fetch thành công
    builder.addCase(fetchDetailMovie.fulfilled, (state, action) => {
      state.loading = false; // Kết thúc trạng thái loading
      state.data = action.payload; // Gán dữ liệu trả về vào state
    });

    // Xử lý khi fetch thất bại
    builder.addCase(fetchDetailMovie.rejected, (state, action) => {
      state.loading = false; // Kết thúc trạng thái loading
      state.error = action.payload; // Gán thông báo lỗi
    });
  },
});

// Export reducer
export default detailMovieReducer.reducer;
