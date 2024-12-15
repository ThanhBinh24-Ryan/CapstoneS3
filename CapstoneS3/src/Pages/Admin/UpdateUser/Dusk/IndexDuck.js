import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../API-Servise/Api-Servise"; // Đảm bảo đúng đường dẫn API

// Lấy token từ localStorage hoặc nơi bạn lưu trữ token
const getToken = () => localStorage.getItem("accessToken");

// Action để lấy thông tin người dùng theo tài khoản
export const fetchUserByTaiKhoan = createAsyncThunk(
  "user/fetchUserByTaiKhoan",
  async (taiKhoan, { rejectWithValue }) => {
    try {
      const token = getToken();
      const result = await api.post(`QuanLyNguoiDung/CapNhatThongTinNguoiDung?taiKhoan=${taiKhoan}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Gửi token trong header
        }
      });
      return result.data.content; // Trả về thông tin người dùng
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message); // Trả về lỗi nếu có
    }
  }
);

// Action để chỉnh sửa thông tin người dùng
export const editUser = createAsyncThunk(
  "user/editUser",
  async (userData, { rejectWithValue }) => {
    try {
      // Tạo FormData để gửi thông tin người dùng qua API
      let formData = new FormData();
      formData.append('taiKhoan', userData.taiKhoan);
      formData.append('matKhau', userData.matKhau);
      formData.append('email', userData.email);
      formData.append('soDt', userData.soDt);
      formData.append('maNhom', userData.maNhom);
      formData.append('maLoaiNguoiDung', userData.maLoaiNguoiDung);
      formData.append('hoTen', userData.hoTen);

      const token = getToken();
      // Gửi dữ liệu lên API
      const result = await api.post('QuanLyNguoiDung/CapNhatThongTinNguoiDung', formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Gửi token trong header
        }
      });
      return result.data.content; // Trả về dữ liệu đã chỉnh sửa
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message); // Trả về lỗi nếu có
    }
  }
);

// Cập nhật slice và thêm extraReducers
const editUserSlice = createSlice({
  name: "editUser",
  initialState: {
    loading: false,
    data: null,
    error: null,
    notification: null, // Thêm thông báo cho kết quả thành công
  },
  reducers: {
    resetUserState: (state) => {
      state.data = null;
      state.error = null;
      state.notification = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserByTaiKhoan.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserByTaiKhoan.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null; // Reset lỗi nếu fetch thành công
      })
      .addCase(fetchUserByTaiKhoan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Đã có lỗi khi tải thông tin người dùng"; // Thông báo lỗi nếu thất bại
      })
      .addCase(editUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.notification = "Cập nhật thành công!"; // Thông báo khi chỉnh sửa thành công
      })
      .addCase(editUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Đã có lỗi khi chỉnh sửa thông tin người dùng"; // Thông báo lỗi nếu thất bại
      });
  },
});

export const { resetUserState } = editUserSlice.actions;

export default editUserSlice.reducer;
