import React from "react";
import PageHeader from "../components/PageHeader";
import SectionContainer from "../components/SectionContainer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { COMPANY_INFO, COLORS } from "../constants";
import type { CoreValue } from "../types";

import aboutBg from "../assets/images/aboutBg.jpg";

import story1Img from "../assets/images/story1.jpg";
import story2Img from "../assets/images/story2.jpg";
import icon1Img from "../assets/images/icon1.jpg";
import icon2Img from "../assets/images/icon2.jpg";
import icon3Img from "../assets/images/icon3.jpg";
import icon4Img from "../assets/images/icon4.jpg";

const coreValuesData: CoreValue[] = [
  {
    image: icon1Img,
    title: "T by Tiffany",
  },
  {
    image: icon2Img,
    title: "Lock by Tiffany",
  },
  {
    image: icon3Img,
    title: "HardWear by Tiffany",
  },
  {
    image: icon4Img,
    title: "Knot by Tiffany",
  },
];

const AboutPage: React.FC = () => {
  return (
    <>
      <PageHeader
        title="Our Stories"
        subtitle=""
        image={aboutBg} // 你本地的图片
      />

      <SectionContainer className={`bg-${COLORS.bgWhite} pt-4 pb-20 -mt-8`}>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <img
              src={story1Img}
              alt="story1"
              className="shadow-lg w-full mt-6"
            />
          </div>
          <div className="space-y-8">
            <div>
              <h3
                className={`text-2xl font-semibold text-${COLORS.brandDark} mb-2`}
              >
                The Autumn Expression of Sea of Wonder
              </h3>
              <p
                className={`text-${COLORS.textSecondary} leading-relaxed text-justify`}
              >
                A tribute to the boundless beauty and rhythm of the oceans, the
                autumn expression of Blue Book 2025: Sea of Wonder re-interprets
                archival masterpieces in a dreamlike journey beneath the waves.
                Each chapter unfolds as an underwater exploration of inventive
                craft featuring the world’s finest diamonds and coloured
                gemstones.
              </p>
            </div>
          </div>
        </div>
      </SectionContainer>

      <SectionContainer className={`bg-${COLORS.bgWhite} pt-4 pb-20 -mt-8`}>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-8">
            <div>
              <h3
                className={`text-2xl font-semibold text-${COLORS.brandDark} mb-2`}
              >
                Love & Engagement
              </h3>
              <p
                className={`text-${COLORS.textSecondary} leading-relaxed text-justify`}
              >
                Only Tiffany could craft a diamond ring worthy of your love
                story. Discover classic and contemporary styles and settings,
                from traditional solitaire engagement rings to modern pavé and
                halo designs – all made with unparalleled craftsmanship to our
                exacting standards.
              </p>
            </div>
          </div>
          <div>
            <img
              src={story2Img}
              alt="story2"
              className="shadow-lg w-full mt-6"
            />
          </div>
        </div>
      </SectionContainer>

      <SectionContainer
        className={`bg-${COLORS.bgWhite} pt-4 pb-20 -mt-8`}
        title="The Tiffany Icons"
      >
        <div className="relative group w-full">
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            loop={true}
            slidesPerView={1}
            speed={800}
            className="w-full"
          >
            {coreValuesData.map((value) => (
              <SwiperSlide key={value.title}>
                <div className="relative flex flex-col items-center">
                  <img
                    src={value.image}
                    alt={value.title}
                    className="w-full h-[600px] object-cover"
                  />
                  <div className="mt-8 text-center">
                    <h3 className="text-3xl font-serif text-black mb-2">
                      {value.title}
                    </h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* ✅ 自定义箭头 */}
          <button
            className={`custom-prev absolute left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-white text-gray-800 hover:bg-${COLORS.brandGreen} hover:text-white rounded-full w-12 h-12 flex items-center justify-center shadow-md transition-all duration-300 z-10`}
          >
            ‹
          </button>
          <button
            className={`custom-next absolute right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-white text-gray-800 hover:bg-${COLORS.brandGreen} hover:text-white rounded-full w-12 h-12 flex items-center justify-center shadow-md transition-all duration-300 z-10`}
          >
            ›
          </button>
        </div>
      </SectionContainer>
    </>
  );
};

export default AboutPage;
