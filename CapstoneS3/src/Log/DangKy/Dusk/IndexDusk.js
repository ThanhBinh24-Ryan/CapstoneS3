import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from "../../../API-Servise/Api-Servise"; // Đảm bảo apiService.js đã được cấu hình đúng

// Tạo async thunk để gọi API đăng ký người dùng
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      // Chuyển dữ liệu người dùng thành JSON
      const payload = {
        taiKhoan: String(userData.taiKhoan),
        matKhau: String(userData.matKhau),
        email: String(userData.email),
        soDt: String(userData.soDt),
        maNhom: String(userData.maNhom),
        hoTen: String(userData.hoTen),
      };

      // Gọi API thông qua `api` và gửi dữ liệu JSON
      const response = await api.post('QuanLyNguoiDung/DangKy', payload, {
        headers: { 'Content-Type': 'application/json' } // Gửi dữ liệu dưới dạng JSON
      });

      return response.data; // Trả về dữ liệu sau khi đăng ký thành công
    } catch (error) {
      // Xử lý lỗi nếu có và trích xuất thông báo lỗi từ API
      return rejectWithValue(
        error.response && error.response.data
          ? error.response.data.message || error.response.data
          : 'Đã xảy ra lỗi khi đăng ký'
      );
    }
  }
);

// Reducer
const registerUserReducer = createSlice({
  name: 'registerUser',
  initialState: {
    loading: false,  // Trạng thái loading khi đăng ký
    data: null,  // Dữ liệu người dùng sau khi đăng ký thành công
    error: null,  // Lỗi khi đăng ký
    notification: null,  // Thông báo đăng ký thành công hoặc lỗi
  },
  reducers: {
    // Thêm action để reset lại trạng thái khi cần thiết
    resetUserState: (state) => {
      state.data = null;
      state.error = null;
      state.notification = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset lỗi cũ nếu có
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Lưu dữ liệu trả về từ API
        state.notification = "Đăng ký thành công!"; // Thông báo khi thành công
        state.error = null; // Reset lỗi nếu có
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Đã xảy ra lỗi khi đăng ký'; // Lưu lỗi nếu có
        state.data = null; // Reset dữ liệu nếu có lỗi
      });
  },
});

export const { resetUserState } = registerUserReducer.actions;

export default registerUserReducer.reducer;
