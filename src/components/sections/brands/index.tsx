import { useState } from "react";

import { Plus } from "@phosphor-icons/react";
import { BrandButton, BrandDiv, BrandsSC, Image, Slider } from "./styled";

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
import { Modal } from "@components";
import { BrandsType } from "@isaac/types";
import BrandDetails from "./brand-details";

const BrandNames: BrandsType[] = [
  "worten",
  "hurb",
  "qconcursos",
  "crowd",
  "lilly",
  "netlinks",
  "adentis",
  "ferragamo",
  "farfetch",
  "cartier",
];

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
  const allBrands = [...BrandNames, ...BrandNames];

  const [brand, setBrand] = useState<BrandsType>("worten");

  const [modalOpen, setModalOpen] = useState(false);

  const handleBrandModal = (brand: BrandsType) => {
    setBrand(brand);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <BrandsSC>
        <Slider stopped={modalOpen}>
          {allImages.map((image, index) => (
            <BrandDiv key={index}>
              <Image src={image} alt={`brand-${index}`} />
              <BrandButton onClick={() => handleBrandModal(allBrands[index])}>
                Ver mais <Plus size={14} />
              </BrandButton>
            </BrandDiv>
          ))}
        </Slider>
      </BrandsSC>
      <Modal isOpen={modalOpen} onClose={handleCloseModal}>
        <BrandDetails brand={brand} />
      </Modal>
    </>
  );
};

export default Brands;
