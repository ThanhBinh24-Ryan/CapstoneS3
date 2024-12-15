import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from "../../../../API-Servise/Api-Servise";  // Đảm bảo apiService.js đã được cấu hình đúng

// Tạo async thunk để gọi API thêm người dùng
export const addNewUser = createAsyncThunk(
  'addNewUser/addNewUser',  // Tên action
  async (userData, { rejectWithValue }) => {
    try {
      // Tạo dữ liệu để gửi lên API
      const userPayload = {
        taiKhoan: userData.taiKhoan,
        matKhau: userData.matKhau,
        email: userData.email,
        soDt: userData.soDt,
        maNhom: 'GP01',  // Có thể thêm logic để lấy maNhom từ UI nếu cần
        maLoaiNguoiDung: userData.maLoaiNguoiDung,
        hoTen: userData.hoTen,
      };

      // Gọi API thêm người dùng
      const response = await api.post('QuanLyNguoiDung/ThemNguoiDung', userPayload, {
        headers: { 'Content-Type': 'application/json' }
      });

      return response.data; // Trả về dữ liệu nếu thành công
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message); // Trả về lỗi nếu có
    }
  }
);

const addNewUserReducer = createSlice({
  name: 'addNewUser',
  initialState: {
    loading: false,
    data: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Xử lý trạng thái khi gọi API đang chờ (pending)
      .addCase(addNewUser.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset lỗi cũ nếu có
      })
      // Xử lý trạng thái khi API trả về dữ liệu thành công (fulfilled)
      .addCase(addNewUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Lưu dữ liệu trả về từ API
        state.error = null; // Reset lỗi nếu có
      })
      // Xử lý trạng thái khi có lỗi (rejected)
      .addCase(addNewUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Đã xảy ra lỗi khi thêm người dùng'; // Lưu lỗi nếu có
        state.data = null; // Reset dữ liệu nếu có lỗi
      });
  },
});

export default addNewUserReducer.reducer;
