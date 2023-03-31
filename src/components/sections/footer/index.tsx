import { FooterSC, SocialFooter, TextFooter } from "./styled";

const Footer = () => {
  return (
    <FooterSC>
      <TextFooter>© 2023 - All rights reserved</TextFooter>

      <TextFooter>
        Made with <TextFooter>❤️</TextFooter>
      </TextFooter>

      <SocialFooter>
        <a
          href="https://www.linkedin.com/in/isaacvianna/"
          target="_blank"
          rel="noreferrer"
        >
          <span>LinkedIn</span>
        </a>
        <span>/</span>
        <a
          href="https://github.com/isaacviannadev"
          target="_blank"
          rel="noreferrer"
        >
          <span>GitHub</span>
        </a>
      </SocialFooter>
    </FooterSC>
  );
};

export default Footer;
