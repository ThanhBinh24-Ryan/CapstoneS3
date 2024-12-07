import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListHTRap } from '../HeThongRap/Dusk/IndexDusk';  // Đảm bảo import đúng action
import RenderHTRap from './RenderHTRap';  // Import component render

export default function IndexHTRap() {
  const dispatch = useDispatch();

  // Lấy state từ Redux với key mới là 'listHTRap'
  const { loading, data, error } = useSelector(state => state.IndexHTRap);
console.log(data);
  useEffect(() => {
    // Dispatch action để fetch dữ liệu khi component mount
    dispatch(fetchListHTRap());
  }, [dispatch]);

  // Hiển thị loading nếu dữ liệu đang được tải
  if (loading) {
    return <div>Loading...</div>;
  }

  // Hiển thị lỗi nếu có
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {/* Render các banner từ data */}
      <RenderHTRap raps ={data} />
    </div>
  );
}
