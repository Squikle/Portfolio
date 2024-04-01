import config from "../../global.config.json";
import { Fragment } from "react";

type Highlight = {
  title: string;
  bullets: string[];
};

export default function JobList() {
  const resume = config.resume;

  const buildHighlights = (highlights: Highlight[]) => {
    return highlights.map((x) => {
      return (
        <Fragment key={x.title}>
          <h4>{x.title}</h4>
          <ul>
            {x.bullets.map((x, i) => (
              <li key={i}>{x}</li>
            ))}
          </ul>
        </Fragment>
      );
    });
  };

  return (
    <>
      {resume.jobs.map((x) => {
        return (
          <Fragment key={x.title + x.period}>
            <h3>{x.period}</h3>
            <h3>
              {x.title} / {x.location}
            </h3>
            <h3>{x.position}</h3>
            <p>{x.description}</p>
            {buildHighlights(x.highlights)}
          </Fragment>
        );
      })}
    </>
  );
}
