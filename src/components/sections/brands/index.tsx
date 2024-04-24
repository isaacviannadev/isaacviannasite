import { BrandsSC, Slider } from "./styled";

import {
  adentis,
  cartier,
  crowd,
  farfetch,
  ferragamo,
  hurb,
  lilly,
  netlinks,
  qconcursos,
  worten,
} from "@assets";

const Brands = () => {
  const images = [
    worten,
    hurb,
    qconcursos,
    crowd,
    lilly,
    netlinks,
    adentis,
    ferragamo,
    farfetch,
    cartier,
  ];

  const allImages = [...images, ...images];

  return (
    <BrandsSC>
      <Slider>
        {allImages.map((image, index) => (
          <img src={image} alt={`brand-${index}`} key={index} />
        ))}
      </Slider>
    </BrandsSC>
  );
};

export default Brands;
