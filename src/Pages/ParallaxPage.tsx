import PageSection from "../Components/Page/PageSection";
import Parallax from "../Components/Parallax/Parallax";
import Page from "../Components/Page/Page";
import styles from "./ParallaxPage.module.css";
import classNames from "classnames";
import { useSwipeScroll } from "../hooks/useSwipeScroll.ts";
import { useCurrentSectionContext } from "../Components/Page/CurrentPageContext/useContexts.ts";

type Props = {
  className?: string;
};

export default function ParallaxPage({ className }: Props) {
  const swipeScroll = useSwipeScroll("main-container");

  const handleActiveChange = (active: boolean) => {
    if (!swipeScroll) return;

    if (active) swipeScroll.bind();
    else swipeScroll.unbind();
  };

  return (
    <Page>
      <PageSection
        className={classNames(className, styles.parallaxSlide)}
        onActiveUpdate={handleActiveChange}
      >
        <ParallaxInContext></ParallaxInContext>
      </PageSection>
    </Page>
  );
}

function ParallaxInContext() {
  const sectionContext = useCurrentSectionContext();
  return <Parallax isActive={sectionContext.isActive}></Parallax>;
}
