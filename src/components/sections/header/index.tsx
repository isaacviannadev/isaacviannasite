import { Envelope } from "@phosphor-icons/react";
import { HeaderSC, IconWrapper, MailWrapper, Social } from "./styled";

const Header = () => {
  return (
    <HeaderSC>
      <MailWrapper href="mailto:talktome@isaacvianna.com.br">
        <IconWrapper>
          <Envelope size={22} weight="thin" />
        </IconWrapper>
        <span>talktome@isaacvianna.com.br</span>
      </MailWrapper>

      <Social>
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
      </Social>
    </HeaderSC>
  );
};

export default Header;
