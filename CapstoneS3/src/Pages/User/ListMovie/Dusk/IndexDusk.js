// listMovieSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../API-Servise/Api-Servise"; // Đảm bảo đúng đường dẫn API

// Fetch danh sách phim từ API
export const fetchListMovie = createAsyncThunk(
  "listMovie/fetchListMovie",
  async () => {
    try {
      const result = await api.get("/QuanLyPhim/LayDanhSachPhim");
      return result.data.content; // Trả về dữ liệu phim
    } catch (error) {
      console.error("Error fetching movies:", error.message);
      throw new Error(error.message); // Thực hiện throw error
    }
  }
);

// Initial state cho listMovieReducer
const initialState = {
  loading: false,
  data: [],  // Mảng phim rỗng mặc định
  error: null,
};

// Slice Redux cho listMovie
const listMovieReducer = createSlice({
  name: "listMovieReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchListMovie.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchListMovie.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload; // Cập nhật data khi thành công
    });
    builder.addCase(fetchListMovie.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message; // Cập nhật lỗi khi thất bại
    });
  },
});

export default listMovieReducer.reducer;
