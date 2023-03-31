import { Envelope } from "@phosphor-icons/react";
import Button from "../../UI/button";
import { ContactContent, ContactSection } from "./styled";

const Contact = () => {
  return (
    <ContactSection>
      <ContactContent>
        <h2>Talk to me about your idea and let's make it real together</h2>

        <a href="mailto:talktome@isaacvianna.com.br" target="_blank">
          <Button
            text="talktome@isaacvianna.com.br"
            icon={<Envelope size={26} weight="thin" />}
          />
        </a>
      </ContactContent>
    </ContactSection>
  );
};

export default Contact;
