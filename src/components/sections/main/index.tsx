import { GithubLogo } from "@phosphor-icons/react";
import { t } from "i18next";
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
        <p>{t("greetings", { name: "Isaac" })} 👋</p>
        <h1>{t("heading")}</h1>
        <Button
          text={t("gitBtn")}
          icon={<GithubLogo size={26} weight="thin" />}
          onClick={clickToGithub}
        />
      </Content>
    </Section>
  );
};

export default MainSection;
