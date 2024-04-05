import ResumeCard from "./ResumeCard";
import { RefObject } from "react";
import styles from "./Resume.module.scss";
import resume from "../../resume-data.json";

export default function IntroCard() {
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
    <ResumeCard cardClassName={styles.introCard}>
      {({ scrollableElementRef }) => {
        return (
          <div
            className={styles.text}
            ref={scrollableElementRef as RefObject<HTMLDivElement>}
          >
            <h1>{resume.name}</h1>
            <h3>{resume.position}</h3>
            <p className={styles.phone}>
              Email:{" "}
              <a href={`mailto:${contactsData.email}`}>{contactsData.email}</a>
            </p>
            <p className={styles.linkedIn}>
              LinkedIn:{" "}
              <a href={contactsData.linkedin}>{contactsData.linkedin}</a>
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
        );
      }}
    </ResumeCard>
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
