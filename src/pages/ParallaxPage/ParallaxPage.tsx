import PageSection from "../../components/Page/PageSection";
import Parallax from "./components/Parallax/Parallax";
import Page from "../../components/Page/Page";
import styles from "./ParallaxPage.module.css";
import classNames from "classnames";
import { useCurrentSectionContext } from "../../components/Page/CurrentPageContext/Contexts.tsx";

type Props = {
  isActive: boolean;
  className?: string;
};

export default function ParallaxPage({ isActive, className }: Props) {
  return (
    <Page
      isActive={isActive}
      className={classNames(className, styles.parallaxPage)}
    >
      <PageSection isActive={isActive}>
        <ParallaxInContext></ParallaxInContext>
      </PageSection>
    </Page>
  );
}

function ParallaxInContext() {
  const sectionContext = useCurrentSectionContext();
  return <Parallax isActive={sectionContext.isActive}></Parallax>;
}
