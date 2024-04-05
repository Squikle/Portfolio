import ExperienceCard from "./ExperienceCard.tsx";
import resume from "../../resume-data.json";
import { useMemo } from "react";
import IntroCard from "./IntroCard.tsx";

export default function useResumeCards() {
  const cards = useMemo(() => {
    const jobsCards = resume.jobs.map((job, i) => {
      const isFirst = i === 0;
      const isLast = i == resume.jobs.length - 1;

      return (
        <ExperienceCard
          job={job}
          isFirst={isFirst}
          isLast={isLast}
        ></ExperienceCard>
      );
    });

    return [<IntroCard />, ...jobsCards];
  }, []);

  return cards;
}
