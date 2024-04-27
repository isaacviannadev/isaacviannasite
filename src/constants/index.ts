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
import { t } from "i18next";

type BrandInfoType = {
  [key: string]: {
    logo: string;
    title: string;
    description: string;
    link: string;
    images: string[];
  };
};

const cdnUrl = "https://cdn.glitch.global/366c06b6-90d2-4995-9a79-d42af2d6b7c2";

export const BrandInfo: BrandInfoType = {
  worten: {
    logo: worten,
    title: "Worten",
    description: t("worten.description"),
    link: "https://www.worten.pt/",
    images: [
      `${cdnUrl}/worten.png?v=1714217687537`,
      `${cdnUrl}/worten2.png?v=1714217688021`,
    ],
  },
  hurb: {
    logo: hurb,
    title: "Hurb",
    description: t("hurb.description"),
    link: "https://www.hurb.com/br",
    images: [
      `${cdnUrl}/hurb.png?v=1714217683346`,
      `${cdnUrl}/hurb2.png?v=1714217683868`,
    ],
  },
  qconcursos: {
    logo: qconcursos,
    title: "QConcursos",
    description: t("qconcursos.description"),
    link: "https://www.qconcursos.com/",
    images: [
      `${cdnUrl}/qconcursos.png?v=1714217686508`,
      `${cdnUrl}/qconcursos2.png?v=1714217687012`,
    ],
  },
  crowd: {
    logo: crowd,
    title: "Crowd",
    description: t("crowd.description"),
    link: "https://www.crowd.br.com",
    images: [
      `${cdnUrl}/crowd.png?v=1714217680608`,
      `${cdnUrl}/crowd2.png?v=1714218587610`,
    ],
  },
  lilly: {
    logo: lilly,
    title: "Lilly Estética",
    description: t("lilly.description"),
    link: "https://www.lillyestetica.com.br",
    images: [
      `${cdnUrl}/lilly.png?v=1714217684460`,
      `${cdnUrl}/lilly2.png?v=1714217685002`,
    ],
  },
  netlinks: {
    logo: netlinks,
    title: "Netlinks",
    description: t("netlinks.description"),
    link: "https://www.netlinks.com.br",
    images: [
      `${cdnUrl}/netlinks.png?v=1714217685491`,
      `${cdnUrl}/netlinks2.png?v=1714217685997`,
    ],
  },
  adentis: {
    logo: adentis,
    title: "Adentis",
    description: t("adentis.description"),
    link: "https://www.adentis.pt",
    images: [
      `${cdnUrl}/adentis.png?v=1714217678424`,
      `${cdnUrl}/adentis2.png?v=1714217679013`,
    ],
  },
  ferragamo: {
    logo: ferragamo,
    title: "Ferragamo",
    description: t("ferragamo.description"),
    link: "https://www.ferragamo.com",
    images: [
      `${cdnUrl}/ferragamo.png?v=1714217682255`,
      `${cdnUrl}/ferragamo2.png?v=1714217682718`,
    ],
  },
  farfetch: {
    logo: farfetch,
    title: "Farfetch",
    description: t("farfetch.description"),
    link: "https://www.farfetch.com",
    images: [
      `${cdnUrl}/farfetch.png?v=1714217681117`,
      `${cdnUrl}/farfetch2.png?v=1714217681591`,
    ],
  },
  cartier: {
    logo: cartier,
    title: "Cartier",
    description: t("cartier.description"),
    link: "https://www.cartier.com",
    images: [
      `${cdnUrl}/cartier.png?v=1714217679551`,
      `${cdnUrl}/cartier2.png?v=1714217680138`,
    ],
  },
  // zeloclub: {
  //   logo: zeloclub,
  //   title: "Zelo Club",
  //   description: t("zeloclub.description"),
  //   link: "https://www.zeloclub.com",
  // },
};
