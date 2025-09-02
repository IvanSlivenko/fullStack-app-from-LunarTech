"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import NextImage from "next/image";

import kanyon from "../public/images/kanyon_2.jpg";



const Book3D = ({
  cover,
  color,
  width,
  height,
  widthImg,
  heightImg,
  widthSvg,
  heightSvg
}: {
  cover?: string;
  color?: string;
  width?: string;
  height?: string;
  widthImg?: string;
  heightImg?: string;
  widthSvg?: string;
  heightSvg?: string;

}) => {
  // const [src, setSrc] = useState(cover || kanyon);
  const defaultImage = "/images/kanyon_2.jpg"
  const [src, setSrc] = useState<string>(defaultImage);

  useEffect(() => {
    // if (!cover) return;
    if(!cover) {
      cover=defaultImage
    }
    const img = new window.Image();
    img.src = cover;
    img.onload = () => setSrc(cover); // валідне зображення
    img.onerror = () => setSrc(defaultImage); // fallback
  }, [cover]);





  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 220 280"
      width={widthSvg}
      height={heightSvg}
    >
      {/* Низ (сторінки) з заокругленими лівим і правим нижнім кутами */}
      <path
        d="
          M 25,250
          L 160,250
          L 200,260
          L 180,270
          A 10,10 0 0 1 180,270
          L 30,270
          A 20,20 0 0 1 20,265
          Z
        "
        fill="#e5e7eb"
      />

      {/* Ліва частина (корінець) з заокругленими верхнім і нижнім лівим кутами */}
      <path
        d="
          M 20,50
          A 20,20 0 0 1 25,30
          L 60,10
          L 60,250
          L 30,260
          A 20,20 0 0 1 20,266
          Z
        "
        // fill="#2d3748"
        fill={color}
      />

      {/* Задня грань */}
      <polygon points="200,10 200,260 160,255 160,10" fill="#d1d5db" />

      {/* Обкладинка (фронтальна) */}

      <foreignObject
        x="60"
        y="10"
        width="170"
        height="240"
        clipPath="url(#clip)"
      >
        <img
          // src={typeof src === "string" ? src : (src as any).src}
          src={typeof src === "string" ? src : defaultImage}
          // src={src}
          alt="Book cover"
          width={widthImg}
          height={heightImg}
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
      </foreignObject>

      {/* ClipPath щоб картинка не вилазила */}
      <defs>
        <clipPath id="clip">
          <rect x="60" y="10" width={width} height={height} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Book3D;
