import { BrandsSC, Slider } from "./styled";

import {
  crowd,
  hurb,
  lilly,
  netlinks,
  qconcursos,
  worten,
} from "../../../assets/brands";

const Brands = () => {
  const images = [
    worten,
    hurb,
    qconcursos,
    crowd,
    lilly,
    netlinks,
    worten,
    hurb,
    qconcursos,
    crowd,
    lilly,
    netlinks,
  ];

  return (
    <BrandsSC>
      <Slider>
        {images.map((image, index) => (
          <img src={image} alt={`brand-${index}`} key={index} />
        ))}
      </Slider>
    </BrandsSC>
  );
};

export default Brands;
