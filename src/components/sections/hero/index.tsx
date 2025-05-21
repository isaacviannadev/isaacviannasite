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
import { HeroContainer, NameText } from "./styled";

export const Hero = () => {
  return (
    <ScrollContainer>
      <ScrollPage>
        <Animator animation={batch(Sticky())}>
          <HeroContainer>
            <Animator animation={batch(Zoom(70, 1))}>
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
          <MainSection />
        </Animator>
      </ScrollPage>
    </ScrollContainer>
  );
};

export default Hero;
