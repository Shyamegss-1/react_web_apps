import { useState } from "react";
// Import Swiper React components
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import { IMAGEURL } from "../../../utils/constants";

interface mediaData {
  media_url: string;
  media_type: string;
}

export default function MediaSection({ data }: { data: [] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore>();

  const [index, setIndex] = useState<number>(-1);

  const photo = data
    .filter((e: mediaData) => e.media_type === "photo")
    .map((e: mediaData) => {
      return {
        src: IMAGEURL + e.media_url,
      };
    });

  const video = data
    .filter((e: mediaData) => e.media_type === "video")
    .map((e: mediaData) => {
      return {
        type: "video",
        width: 1280,
        height: 720,
        poster:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLIZnqW9mTUkFO9N7NbzVrMlfEmzSHE0X24w&usqp=CAU",
        sources: [
          {
            src: IMAGEURL + e.media_url,
            type: "video/mp4",
          },
        ],
      };
    });

  return (
    <>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {data.map((e: mediaData, index: number) => {
          return (
            <SwiperSlide key={index}>
              <a
                onClick={() => setIndex(index - 1)}
                style={{ width: "100%", cursor: "pointer" }}
              >
                <img
                  src={e.media_type === "photo" ? IMAGEURL + e.media_url : v}
                />
              </a>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {data.map((e: mediaData, index: number) => {
          return (
            <SwiperSlide key={index}>
              <img
                src={e.media_type === "photo" ? IMAGEURL + e.media_url : v}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>

      <Lightbox
        index={index}
        plugins={[Video]}
        slides={[...photo, ...video]}
        open={index > -1}
        close={() => setIndex(-1)}
      />
    </>
  );
}

const v =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLIZnqW9mTUkFO9N7NbzVrMlfEmzSHE0X24w&usqp=CAU";
