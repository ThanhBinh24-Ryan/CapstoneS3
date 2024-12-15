// Dusk/IndexDusk.js (cập nhật thêm slice và actions)
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../API-Servise/Api-Servise"; // Đảm bảo đúng đường dẫn API

// Lấy token từ localStorage hoặc nơi bạn lưu trữ token
const getToken = () => localStorage.getItem("accessToken");

// Action để lấy thông tin sản phẩm theo ID
export const fetchProductById = createAsyncThunk(
  "product/fetchProductById",
  async (id, { rejectWithValue }) => {
    try {
      const token = getToken();
      const result = await api.get(`QuanLyPhim/LayThongTinPhim?MaPhim=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,  // Gửi token trong header
        }
      });
      return result.data.content; // Trả về thông tin sản phẩm
    } catch (error) {
      return rejectWithValue(error); // Trả về lỗi nếu có
    }
  }
);

// Action để chỉnh sửa sản phẩm
export const editProduct = createAsyncThunk(
  "product/editProduct",
  async (productData, { rejectWithValue }) => {
    try {
      // Tạo FormData để gửi thông tin sản phẩm qua API
      let formData = new FormData();
      formData.append('maPhim', productData.maPhim);
      formData.append('tenPhim', productData.tenPhim);
      formData.append('moTa', productData.moTa);
      formData.append('ngayKhoiChieu', productData.ngayKhoiChieu);
      formData.append('sapChieu', productData.sapChieu);
      formData.append('dangChieu', productData.dangChieu);
      formData.append('hot', productData.hot);
      formData.append('hinhAnh', productData.hinhAnh); // Hình ảnh có thể là file
      formData.append('trailer', productData.trailer);
      formData.append('danhGia', productData.danhGia);

      const token = getToken();
      // Gửi dữ liệu lên API
      const result = await api.post('QuanLyPhim/CapNhatPhimUpload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,  // Gửi token trong header
        }
      });
      return result.data.content; // Trả về dữ liệu đã chỉnh sửa
    } catch (error) {
      return rejectWithValue(error); // Trả về lỗi nếu có
    }
  }
);

// Cập nhật slice và thêm extraReducers
const editProductSlice = createSlice({
  name: "editProduct",
  initialState: {
    loading: false,
    data: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(editProduct.rejected, (state, action) => {
        // state.loading = false;
        // state.error = action.payload;
        state.error = action.error.message;
      });
  },
});

export default editProductSlice.reducer;
