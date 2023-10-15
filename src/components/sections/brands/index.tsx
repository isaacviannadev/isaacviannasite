import { BrandsSC, Slider } from "./styled";

import {
  crowd,
  hurb,
  lilly,
  netlinks,
  qconcursos,
  worten,
  adentis,
  ferragamo,
  farfetch,
  cartier,
} from "../../../assets/brands";

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
