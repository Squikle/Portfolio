import InfoCard from "../TextCard/InfoCard.tsx";
import config from "../../global.config.json";
import styles from "./Resume.module.scss";
import JobList from "./JobList.tsx";
import classNames from "classnames";

function Intro() {
  const resume = config.resume;

  return (
    <InfoCard className={classNames(styles.card, styles.introCard)}>
      <h3>{resume.name}</h3>
      <h3>{resume.position}</h3>
      <p>{resume.description}</p>
    </InfoCard>
  );
}

function ExperienceUpswot() {
  const resume = config.resume;

  return (
    <InfoCard className={classNames(styles.card, styles.jobCard)}>
      <JobList job={resume.jobs[0]}></JobList>
    </InfoCard>
  );
}

function ExperienceBtcs() {
  const resume = config.resume;

  return (
    <InfoCard className={classNames(styles.card, styles.jobCard)}>
      <JobList job={resume.jobs[1]}></JobList>
    </InfoCard>
  );
}

export { Intro, ExperienceUpswot, ExperienceBtcs };
