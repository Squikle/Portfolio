import { Fragment, useRef } from "react";
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
  onOverScroll,
}: {
  job: Job;
  isFirst: boolean;
  isLast: boolean;
  onOverScroll: (percentage: number) => void;
}) {
  const textRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const element = textRef.current;
    if (!element) throw new Error("Text element ref must be set!");

    const isScrollable = element.scrollHeight > element.clientHeight;

    if (!isScrollable) {
      element.classList.remove(style.fadeBottom, style.fadeTop);
      return;
    }

    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight;
    const clientHeight = element.clientHeight;

    const maxScrollHeight = scrollHeight - clientHeight;
    const currentScrollPercentage = (scrollTop / maxScrollHeight) * 100;

    element.classList.toggle(style.fadeBottom, currentScrollPercentage < 100);
    element.classList.toggle(style.fadeTop, currentScrollPercentage > 0);

    if (scrollTop + clientHeight >= scrollHeight) {
      const scrolledPastEnd =
        ((scrollTop + clientHeight - scrollHeight) / scrollHeight) * 100;
      if (onOverScroll) onOverScroll(scrolledPastEnd);
    }

    if (scrollTop < 0) {
      const scrolledPastTop = (scrollTop / scrollHeight) * 100;
      if (onOverScroll) onOverScroll(scrolledPastTop);
    }
  };

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
      <div className={style.text} onScroll={handleScroll} ref={textRef}>
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
