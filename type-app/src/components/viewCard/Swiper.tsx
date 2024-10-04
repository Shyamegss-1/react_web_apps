import { SwiperSlide, Swiper } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper";
import { useState, useEffect } from "react";
import { Skeleton } from "@mui/material";

interface swiperProps {
  picutreData: string[];
}

export default function SwiperComponent({ picutreData }: swiperProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setLoading(true);
    };

    img.src = picutreData[0];
  }, [picutreData]);

  return (
    <>
      {loading ? (
        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          navigation={true}
          loop={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {picutreData.map((e, index) => (
            <SwiperSlide key={index}>
              <img style={{ objectFit: "cover" }} height={260} src={e} alt="" />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Skeleton variant="rectangular" height={260} />
      )}
    </>
  );
}
