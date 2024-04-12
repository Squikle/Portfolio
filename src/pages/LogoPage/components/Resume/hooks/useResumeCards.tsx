import ExperienceCard from "../Card/ExperienceCard.tsx";
import resume from "../../../../../configs/resume-data.json";
import { useMemo } from "react";
import IntroCard from "../Card/IntroCard.tsx";

export default function useResumeCards() {
  const cards = useMemo(() => {
    const jobsCards = resume.jobs.map((job, i) => {
      const isFirst = i === 0;

      return (
        <ExperienceCard
          job={job}
          isFirst={isFirst}
          isLast={false}
        ></ExperienceCard>
      );
    });

    return [<IntroCard />, ...jobsCards];
  }, []);

  return cards;
}
