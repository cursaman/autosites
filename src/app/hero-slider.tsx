"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import { A11y, Autoplay, Keyboard, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import ideaImage from "../../public/images/hero/ai-idea.png";
import buildImage from "../../public/images/hero/ai-build.png";
import deployImage from "../../public/images/hero/ai-deploy.png";
import styles from "./hero-slider.module.css";

type HeroSlide = {
  image: StaticImageData;
  alt: string;
  step: string;
  title: string;
};

const slides: readonly HeroSlide[] = [
  { image: ideaImage, alt: "아이디어 노트에서 홈페이지 화면을 구상하는 사업자", step: "01 · IDEA", title: "생각을 말하면 기획이 시작됩니다." },
  { image: buildImage, alt: "AI와 대화하며 데스크톱과 모바일 홈페이지를 제작하는 모습", step: "02 · AI BUILD", title: "AI와 함께 실제 화면을 만듭니다." },
  { image: deployImage, alt: "완성된 홈페이지가 데스크톱과 태블릿, 휴대폰에 배포된 모습", step: "03 · GO LIVE", title: "완성한 홈페이지를 실제 URL로 배포합니다." },
];

export default function HeroSlider() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduceMotion(media.matches);
    updatePreference();
    media.addEventListener("change", updatePreference);
    return () => media.removeEventListener("change", updatePreference);
  }, []);

  return (
    <div className={styles.frame} aria-label="아이디어부터 홈페이지 배포까지">
      <Swiper
        className={styles.slider}
        modules={[A11y, Autoplay, Keyboard, Pagination]}
        slidesPerView={1}
        loop={!reduceMotion}
        speed={reduceMotion ? 0 : 650}
        autoplay={reduceMotion ? false : { delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        keyboard={{ enabled: true }}
        pagination={{ clickable: true }}
        a11y={{ enabled: true, prevSlideMessage: "이전 이미지", nextSlideMessage: "다음 이미지", paginationBulletMessage: "{{index}}번째 이미지로 이동" }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.step}>
            <figure className={styles.slide}>
              <Image src={slide.image} alt={slide.alt} fill priority={slide.step.startsWith("01")} sizes="(max-width: 900px) calc(100vw - 40px), 46vw" />
              <figcaption><span>{slide.step}</span><strong>{slide.title}</strong></figcaption>
            </figure>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
