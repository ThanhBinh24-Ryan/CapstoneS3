import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../../../API-Servise/Api-Servise';  // Giả sử api.delete là phương thức của bạn
const getToken = () => localStorage.getItem("accessToken");
// Khởi tạo state ban đầu
const initialState = {
  loading: false,
  products: [], // Danh sách sản phẩm
  error: null,
};

// Tạo action async để xóa sản phẩm
export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidGVzdDEyMyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InRlc3QzMTIzQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6WyJRdWFuVHJpIiwidGVzdDMxMjNAZ21haWwuY29tIiwiR1AwMSJdLCJuYmYiOjE3MzM5MjEwMzEsImV4cCI6MTczMzkyNDYzMX0.jobbuoO0jRNQBsFIi-7ADt2uxBTXjm7YASSBmy97Zfo";

      // Gọi API xóa sản phẩm với header Authorization
      const {data} = await axios.delete(`https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/XoaNguoiDung/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Nếu xóa thành công, trả về ID để reducer xử lý
      return { id };
    } catch (error) {
      // Kiểm tra lỗi và xử lý
      if (error.response) {
        // Nếu lỗi có response, kiểm tra mã lỗi
        if (error.response.status === 404) {
          return rejectWithValue('Sản phẩm không tồn tại hoặc đã bị xóa.');
        } else if (error.response.status === 500) {
          return rejectWithValue('Lỗi máy chủ, vui lòng thử lại sau.');
        } else {
          return rejectWithValue(error.response?.data || error.message);
        }
      }
      // Nếu không có response (có thể lỗi mạng hoặc server không phản hồi)
      return rejectWithValue('Không thể kết nối tới server. Vui lòng thử lại.');
    }
  }
);

// Tạo slice cho product
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        // Loại bỏ sản phẩm đã xóa khỏi danh sách
        state.products = state.products.filter(
          (product) => product.id !== action.payload.id
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Lỗi từ rejectWithValue
      });
  },
});

export default productSlice.reducer;
