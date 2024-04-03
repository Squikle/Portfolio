import InfoCard from "../TextCard/InfoCard.tsx";
import styles from "./Resume.module.scss";
import JobList from "./JobList.tsx";
import classNames from "classnames";
import resume from "../../resume-data.json";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { SwiperClass } from "swiper/react";
import useFadeScroll from "../../hooks/FadeScroll/useFadeScroll.ts";

export default function useResumeCards(swiper: SwiperClass | null) {
  let scrolledOut = false;

  const handleScroll = useCallback(
    (percentage: number) => {
      if (scrolledOut) return;

      const threshold = 12.5;
      if (percentage > threshold) {
        swiper?.slideNext();
        scrolledOut = true;
      } else if (percentage < -threshold) {
        swiper?.slidePrev();
        scrolledOut = true;
      }
    },
    [swiper, scrolledOut],
  );

  useEffect(() => {
    if (!swiper) return;
    const handleTransitionEnd = () => {
      scrolledOut = false;
    };

    swiper.on("transitionEnd", handleTransitionEnd);
    return () => swiper.off("transitionEnd", handleTransitionEnd);
  }, [swiper]);

  const cards = useMemo(() => {
    const jobsCards = resume.jobs.map((job, i) => {
      const isFirst = i === 0;
      const isLast = i == resume.jobs.length - 1;

      return (
        <InfoCard key={i} className={classNames(styles.card, styles.jobCard)}>
          <JobList
            onSwipe={handleScroll}
            job={job}
            isFirst={isFirst}
            isLast={isLast}
          ></JobList>
        </InfoCard>
      );
    });

    return [<IntroCard />, ...jobsCards];
  }, [handleScroll]);

  return cards;
}

function IntroCard() {
  const textRef = useRef<HTMLDivElement>(null);
  useFadeScroll(textRef);

  const contactsData = resume.contacts;
  const skillsData = resume.skills;
  const stackData = resume.stack;
  const educationsData = resume.educations;

  const educations = (
    <div className={styles.educations}>
      {educationsData.map((x, i) => {
        return (
          <div key={i} className={styles.education}>
            <h5>{x.degree}</h5>
            <p>{x.title}</p>
            <p>{x.location}</p>
          </div>
        );
      })}
    </div>
  );

  return (
    <InfoCard className={classNames(styles.card, styles.introCard)}>
      <div className={styles.text} ref={textRef}>
        <h1>{resume.name}</h1>
        <h3>{resume.position}</h3>
        <p className={styles.phone}>
          Email:{" "}
          <a href={`mailto:${contactsData.email}`}>{contactsData.email}</a>
        </p>
        <p className={styles.linkedIn}>
          LinkedIn: <a href={contactsData.linkedin}>{contactsData.linkedin}</a>
        </p>
        <p className={styles.phone}>
          Phone:{" "}
          <a href={`tel:${contactsData.phoneNumber}`}>
            {contactsData.phoneNumber}
          </a>
        </p>
        <p className={styles.phone}>
          Secondary Phone:{" "}
          <a href={`tel:${contactsData.phoneNumberSecondary}`}>
            {contactsData.phoneNumberSecondary}
          </a>
        </p>
        <p className={styles.phone}>
          Location:{" "}
          <a href={contactsData.locationLink}>{contactsData.location}</a>
        </p>
        <p className={styles.greeting}>{resume.greeting}</p>
        <p className={styles.description}>{resume.description}</p>
        <div className={styles.features}>
          <div className={styles.skillsContainer}>
            <h4>Skills:</h4>
            <div className={styles.skills}>
              <UlList data={skillsData}></UlList>
            </div>
          </div>
          <div className={styles.backendContainer}>
            <div className={styles.backend}>
              <h4>Backend:</h4>
              <UlList data={stackData.backend}></UlList>
            </div>
            <div className={styles.infrastructure}>
              <h4>Infrastructure:</h4>
              <UlList data={stackData.infrastructure}></UlList>
            </div>
          </div>
          <h4>Frontend:</h4>
          <div className={styles.frontendContainer}>
            <div className={styles.frontendTools}>
              <h5>Tools:</h5>
              <UlList data={stackData.frontend.tools}></UlList>
            </div>
            <div className={styles.frontendTools}>
              <h5>Libs:</h5>
              <UlList data={stackData.frontend.libs}></UlList>
            </div>
          </div>
          <h4>Educations:</h4>
          {educations}
        </div>
      </div>
    </InfoCard>
  );
}

function UlList({ data }: { data: any[] }) {
  return (
    <ul>
      {data.map((s, i) => {
        return (
          <li key={i}>
            <p>{s}</p>
          </li>
        );
      })}
    </ul>
  );
}
