import {
  Devices,
  Palette,
  TerminalWindow,
  UsersThree,
} from "@phosphor-icons/react";
import Card from "../../UI/card";
import { Section } from "../main/styled";
import { WorkContent, WorkItemsSC } from "./styled";
import { t } from "i18next";

const Work = () => {
  const services = [
    {
      title: t("development.title"),
      description: t("development.description"),
      icon: <TerminalWindow size={54} weight="thin" />,
    },
    {
      title: t("design.title"),
      description: t("design.description"),
      icon: <Palette size={54} weight="thin" />,
    },
    {
      title: t("web.title"),
      description: t("web.description"),
      icon: <Devices size={54} weight="thin" />,
    },
    {
      title: t("agile.title"),
      description: t("agile.description"),
      icon: <UsersThree size={54} weight="thin" />,
    },
  ];

  return (
    <Section>
      <WorkContent>
        <h2>{t("itsTimeMessage")}</h2>

        <WorkItemsSC>
          {services.map((service, index) => (
            <Card key={index}>
              {service.icon}
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </Card>
          ))}
        </WorkItemsSC>
      </WorkContent>
    </Section>
  );
};

export default Work;
