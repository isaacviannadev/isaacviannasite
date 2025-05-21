import {
  Animator,
  batch,
  Fade,
  MoveOut,
  ScrollContainer,
  ScrollPage,
  Sticky,
  Zoom,
} from "react-scroll-motion";

import MainSection from "../main";
import { HeroContainer, NameText, NextSection } from "./styled";

export const Hero = () => {
  return (
    <ScrollContainer>
      <ScrollPage>
        <Animator animation={batch(Sticky())}>
          <HeroContainer>
            <Animator animation={batch(Zoom(60, 1))}>
              <NameText>
                <span>Developer</span>
                Isaac Vianna
              </NameText>
            </Animator>
          </HeroContainer>
        </Animator>
      </ScrollPage>

      <ScrollPage>
        <Animator animation={batch(Sticky(), Fade(), MoveOut(0, -1000))}>
          <NextSection>
            <MainSection />
          </NextSection>
        </Animator>
      </ScrollPage>
    </ScrollContainer>
  );
};

export default Hero;
