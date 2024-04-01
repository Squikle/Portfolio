import JobList from "./JobList";
import InfoCard from "../TextCard/InfoCard.tsx";
import {
  useCurrentPageContext,
  useCurrentSectionContext,
} from "../Page/CurrentPageContext/useContexts.ts";
import config from "../../global.config.json";
import { useEffect } from "react";

export default function Resume() {
  const resume = config.resume;

  return (
    <>
      <InfoCard>
        <h1>{resume.name}</h1>
        <h2>{resume.position}</h2>
        <h2>Profile:</h2>
        <p>{resume.description}</p>
        <h2>Work Experience:</h2>
        <JobList></JobList>
      </InfoCard>
    </>
  );
}
