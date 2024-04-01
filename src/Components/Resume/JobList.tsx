import { Fragment } from "react";
import style from "./Resume.module.scss";

type Highlight = {
  title: string;
  bullets: string[];
};

type Job = {
  title: string;
  period: string;
  location: string;
  position: string;
  description: string;
  highlights: Highlight[];
};

export default function JobList({ job }: { job: Job }) {
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
      <Fragment key={job.title + job.period}>
        <div className={style.storyLine}>
          <div className={style.line}></div>
        </div>
        <div>
          <h3 className={style.period}>{job.period}</h3>
          <h3 className={style.position}>{job.position}</h3>
        </div>
        <div>
          <h3 className={style.title}>{job.title}</h3>
          <h3 className={style.location}>{job.location}</h3>
        </div>
        <h5 className={style.description}>{job.description}</h5>
        {buildHighlights(job.highlights)}
      </Fragment>
    </>
  );
}
