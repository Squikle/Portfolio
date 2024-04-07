export type ResumePageContext = {
  setActiveIndex: (index: number) => void;
};

export type ResumeSectionContext = {
  index: number;
  activeIndex: number;
  totalCards: number;
};
