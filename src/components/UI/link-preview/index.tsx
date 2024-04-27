import styled from "styled-components";

const LinkPreviewContainer = styled.div`
  width: 100%;
  height: 200px; // Ajuste conforme necessário
  border: none; // Remova as bordas se necessário
`;

type LinkPreviewProps = {
  url: string;
};

export const LinkPreview = ({ url }: LinkPreviewProps) => (
  <LinkPreviewContainer>
    <iframe
      src={url}
      width="100%"
      height="100%"
      allow="autoplay; encrypted-media"
      title="Link Preview"
      loading="lazy"
    />
  </LinkPreviewContainer>
);

export default LinkPreview;
