import InfoCard from "../TextCard/InfoCard.tsx";
import styles from "./Resume.module.scss";
import JobList from "./JobList.tsx";
import classNames from "classnames";
import resume from "../../resume-data.json";
import { useMemo } from "react";

export default function useResumeCards() {
  const cards = useMemo(() => {
    const jobsCards = resume.jobs.map((job, i) => {
      const isFirst = i === 0;
      const isLast = i == resume.jobs.length - 1;

      return (
        <InfoCard key={i} className={classNames(styles.card, styles.jobCard)}>
          <JobList job={job} isFirst={isFirst} isLast={isLast}></JobList>
        </InfoCard>
      );
    });

    return [<IntroCard />, ...jobsCards];
  }, []);

  return cards;
}

function IntroCard() {
  const contacts = resume.contacts;
  return (
    <InfoCard className={classNames(styles.card, styles.introCard)}>
      <div className={styles.text}>
        <h1>{resume.name}</h1>
        <h3>{resume.position}</h3>
        <p className={styles.phone}>
          Email: <a href={`mailto:${contacts.email}`}>{contacts.email}</a>
        </p>
        <p className={styles.linkedIn}>
          LinkedIn: <a href={contacts.linkedin}>{contacts.linkedin}</a>
        </p>
        <p className={styles.phone}>
          Phone:{" "}
          <a href={`tel:${contacts.phoneNumber}`}>{contacts.phoneNumber}</a>
        </p>
        <p className={styles.phone}>
          Secondary Phone:{" "}
          <a href={`tel:${contacts.phoneNumberSecondary}`}>
            {contacts.phoneNumberSecondary}
          </a>
        </p>
        <p className={styles.phone}>
          Location: <a href={contacts.locationLink}>{contacts.location}</a>
        </p>
        <p className={styles.greeting}>{resume.greeting}</p>
        <p className={styles.description}>{resume.description}</p>
      </div>
    </InfoCard>
  );
}

function SkillsCard() {
  return (
    <InfoCard className={classNames(styles.card, styles.introCard)}>
      <div className={styles.text}></div>
    </InfoCard>
  );
}
