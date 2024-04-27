import { X } from "@phosphor-icons/react";
import { Content, Header, Wrapper } from "./styled";

type ModalProps = {
  children?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  const handleClose = () => {
    onClose && onClose();
  };

  if (!isOpen) return null;

  return (
    <Wrapper>
      <Content>
        <Header>
          <X size={24} onClick={handleClose} />
        </Header>
        {children}
      </Content>
    </Wrapper>
  );
};

export default Modal;
