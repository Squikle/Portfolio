import ExperienceCard from "./ExperienceCard.tsx";
import resume from "../../resume-data.json";
import { useMemo } from "react";
import IntroCard from "./IntroCard.tsx";

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
