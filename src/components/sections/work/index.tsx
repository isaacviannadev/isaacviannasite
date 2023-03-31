import {
  Devices,
  Palette,
  TerminalWindow,
  UsersThree,
} from "@phosphor-icons/react";
import Card from "../../UI/card";
import { Section } from "../main/styled";
import { WorkContent, WorkItemsSC } from "./styled";

const services = [
  {
    title: "Development",
    description:
      "I can help you to create your software, from the idea to the final product.",
    icon: <TerminalWindow size={54} weight="thin" />,
  },
  {
    title: "Design & UX/UI",
    description:
      "Combining creativity and usability to make a smart and functional design",
    icon: <Palette size={54} weight="thin" />,
  },
  {
    title: "Consulting",
    description:
      "Anywhere and on any device, your solution within everyone's reach",
    icon: <Devices size={54} weight="thin" />,
  },
  {
    title: "Agile Management",
    description: "Agile management of your project, saving time and resources",
    icon: <UsersThree size={54} weight="thin" />,
  },
];

const Work = () => {
  return (
    <Section>
      <WorkContent>
        <h2>It's time to make your software</h2>

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
