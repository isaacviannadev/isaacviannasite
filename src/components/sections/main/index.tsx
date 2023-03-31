import { GithubLogo } from "@phosphor-icons/react";
import Profile from "../../../assets/me.png";
import Button from "../../UI/button";
import { Content, Section } from "./styled";

const MainSection = () => {
  const clickToGithub = () => {
    return window.open("https://github.com/isaacviannadev", "_blank");
  };

  return (
    <Section>
      <Content>
        <img src={Profile} alt="My photo bw" />
        <p>Hi, I'm Isaac 👋</p>
        <h1>
          Software engineer and frontend developer, passionate about creating
          memorable digital experiences
        </h1>
        <Button
          text="My Github"
          icon={<GithubLogo size={26} weight="thin" />}
          onClick={clickToGithub}
        />
      </Content>
    </Section>
  );
};

export default MainSection;
