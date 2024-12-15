import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from "../../../../API-Servise/Api-Servise";  // Đảm bảo apiService.js đã được cấu hình đúng

// Tạo async thunk để gọi API thêm sản phẩm
export const addNewProduct = createAsyncThunk(
  'addNewProduct/addNewProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('tenPhim', productData.tenPhim);
      formData.append('moTa', productData.moTa);
      formData.append('ngayKhoiChieu', productData.ngayKhoiChieu);
      formData.append('sapChieu', productData.sapChieu);
      formData.append('dangChieu', productData.dangChieu);
      formData.append('hot', productData.hot);
      formData.append('danhGia', productData.danhGia);
      formData.append('trailer', productData.trailer);
      formData.append('hinhAnh', productData.hinhAnh);  // Thêm file ảnh vào FormData

      // Gọi API thông qua `api`
      const response = await api.post('QuanLyPhim/ThemPhimUploadHinh', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      return response.data; // Trả về dữ liệu sau khi thêm sản phẩm thành công
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message); // Trả về lỗi nếu có
    }
  }
);

const addNewProductReducer = createSlice({
    name: 'addNewProduct',
    initialState: {
      loading: false,
      data: null,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        // Xử lý trạng thái khi gọi API đang chờ (pending)
        .addCase(addNewProduct.pending, (state) => {
          state.loading = true;
          state.error = null; // Reset lỗi cũ nếu có
        })
        // Xử lý trạng thái khi API trả về dữ liệu thành công (fulfilled)
        .addCase(addNewProduct.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload; // Lưu dữ liệu trả về từ API
          state.error = null; // Reset lỗi nếu có
        })
        // Xử lý trạng thái khi có lỗi (rejected)
        .addCase(addNewProduct.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || 'Đã xảy ra lỗi khi thêm sản phẩm'; // Lưu lỗi nếu có
          state.data = null; // Reset dữ liệu nếu có lỗi
        });
    },
  });
  
  export default addNewProductReducer.reducer;
