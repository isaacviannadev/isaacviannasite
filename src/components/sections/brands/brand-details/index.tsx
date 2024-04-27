import { Image } from "../styled";

import { BrandInfo } from "@isaac/constants";
import { BrandsType } from "@isaac/types";
import { t } from "i18next";
import { Container, Content, Description, Details, ImageBox } from "./styled";

type BrandDetailsProps = {
  brand: BrandsType;
};

const BrandDetails = ({ brand }: BrandDetailsProps) => {
  return (
    <Container>
      <Image src={BrandInfo[brand].logo} alt={`brand-${brand}`} />
      <Content>
        <Description>
          <h4> {t("about") + " " + BrandInfo[brand].title}</h4>
          <p>{t(`${brand}.description`)}</p>
        </Description>
        <Details>
          <ImageBox>
            {BrandInfo[brand].images.map((image, index) => (
              <img key={index} src={image} alt={`brand-${index}`} />
            ))}
          </ImageBox>

          <a href={BrandInfo[brand].link} target="_blank" rel="noreferrer">
            {t("visitHere") + " " + BrandInfo[brand].link}
          </a>
        </Details>
      </Content>
    </Container>
  );
};

export default BrandDetails;
