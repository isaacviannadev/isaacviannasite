import {
  Animator,
  batch,
  Fade,
  Move,
  ScrollContainer,
  ScrollPage,
  Sticky,
  Zoom,
} from "react-scroll-motion";

import {
  HeroContainer,
  NameText,
  NextSection,
  RevealContainer,
} from "./styled";

export const Hero = () => {
  return (
    <ScrollContainer>
      <ScrollPage>
        <Animator animation={batch(Sticky(), Fade())}>
          <HeroContainer>
            <RevealContainer>
              <NextSection />
            </RevealContainer>
            <Animator
              animation={batch(Zoom(20, 1), Move(0, 0, 0, 0), Fade(0, 1))}
            >
              <NameText>Isaac Vianna</NameText>
            </Animator>
          </HeroContainer>
        </Animator>
      </ScrollPage>
    </ScrollContainer>
  );
};

export default Hero;
