import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../API-Servise/Api-Servise";

// Fetch danh sách lịch chiếu từ API
export const fetchListLich = createAsyncThunk(
  "listLich/fetchListLich",
  async (_, { rejectWithValue }) => {
    try {
      const result = await api.get(
        "QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP01"
      );

      if (result?.data?.content) {
        console.log("Dữ liệu từ API:", result.data.content);
        return result.data.content;
      } else {
        console.error("API không trả về dữ liệu hợp lệ");
        return rejectWithValue("Không có dữ liệu từ API");
      }
    } catch (error) {
      console.error("Lỗi khi fetch lịch chiếu:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  loading: false,
  data: [],
  error: null,
};

// Slice Redux
const listLichReducer = createSlice({
  name: "listLichReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchListLich.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchListLich.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(action.payload)) {
          state.data = action.payload;
        } else {
          console.error("Dữ liệu không phải là mảng:", action.payload);
          state.data = [];
        }
      })
      .addCase(fetchListLich.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Có lỗi xảy ra!";
      });
  },
});

export default listLichReducer.reducer;
