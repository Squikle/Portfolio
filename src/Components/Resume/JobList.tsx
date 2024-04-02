import { Fragment } from "react";
import style from "./Resume.module.scss";
import classNames from "classnames";
import Heart from "../../Icons/Heart.tsx";

type Highlight = {
  title: string;
  bullets: string[];
};

type Job = {
  company: string;
  period: string;
  location: string;
  position: string;
  description: string;
  highlights: Highlight[];
};

export default function JobList({
  job,
  isFirst,
  isLast,
}: {
  job: Job;
  isFirst: boolean;
  isLast: boolean;
}) {
  const buildHighlights = (highlights: Highlight[]) => {
    return highlights.map((x) => {
      return (
        <Fragment key={x.title}>
          <h4 className={style.highlight}>{x.title}</h4>
          <ul>
            {x.bullets.map((x, i) => (
              <li key={i}>
                <p>{x}</p>
              </li>
            ))}
          </ul>
        </Fragment>
      );
    });
  };

  return (
    <>
      <div className={style.lineContainer}>
        <div
          className={classNames(
            style.line,
            { [style.lineStart]: isFirst },
            { [style.lineEnd]: isLast },
          )}
        />
      </div>
      <div className={style.text}>
        <div className={style.jobHeader}>
          <div>
            <h3 className={style.period}>{job.period}</h3>
            <h3 className={style.position}>{job.position}</h3>
          </div>
          <div>
            <div className={style.companyContainer}>
              <Heart className={style.heart}></Heart>
              <h3 className={style.company}>{job.company}</h3>
            </div>
            <h3 className={style.location}>{job.location}</h3>
          </div>
        </div>
        <h5 className={style.description}>{job.description}</h5>
        {buildHighlights(job.highlights)}
      </div>
    </>
  );
}
