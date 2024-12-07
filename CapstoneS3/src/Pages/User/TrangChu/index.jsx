import React from "react";
import IndexBaner from "../Banner/IndexBaner";
import ListMovie from "../ListMovie/RenderListMovie";
import IndexHTRap from "../HeThongRap/IndexHTRap";
import ListLich from "../TTLichChieu/RenderTTLichChieu";
export default function TrangChu() {
  return (
    <div>
      <IndexBaner />
      <ListMovie />
      <div className="flex">
        <div className="pl-20">
          <IndexHTRap />
        </div>
        <div className="pl-40">
          <ListLich />
        </div>
      </div>
    </div>
  );
}
