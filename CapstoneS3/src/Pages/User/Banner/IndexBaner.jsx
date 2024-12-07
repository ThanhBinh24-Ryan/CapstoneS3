import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListBanner } from '../Banner/Dusk/IndexDusk';  // Đảm bảo import đúng action
import RenderBanner from './RenderBander';  // Import component render

export default function IndexBanner() {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector(state => state.listBanner);

  useEffect(() => {
    dispatch(fetchListBanner());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <RenderBanner banners={data} />
    </div>
  );
}
