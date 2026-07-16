import React, { createContext, useContext, useState, ReactNode } from "react";

export interface BoardMember {
  name: string;
  title: string;
  affiliation: string;
}

export interface JournalProposalData {
  title: string;
  discipline: string;
  subDiscipline: string;
  scope: string;
  institution: string;
  country: string;
  website: string;
  institutionBacked: boolean;
  editorName: string;
  editorTitle: string;
  editorAffiliation: string;
  boardMembers: BoardMember[];
  contactEmail: string;
  frequency: string;
  languages: string;
  commitPeerReview: boolean;
  commitEthics: boolean;
  commitNoPredatory: boolean;
}

export interface JournalState {
  proposal: JournalProposalData;
  governanceComplete: boolean;
  policiesAccepted: boolean;
  technicalSetupComplete: boolean;
  reviewStatus: "under-review" | "feedback-required" | "approved";
  launchChecklist: {
    editorialBoard: boolean;
    submissionSystem: boolean;
    callForPapers: boolean;
    publiclyListed: boolean;
  };
  launched: boolean;
}

const defaultProposal: JournalProposalData = {
  title: "", discipline: "", subDiscipline: "", scope: "",
  institution: "", country: "", website: "", institutionBacked: false,
  editorName: "", editorTitle: "", editorAffiliation: "",
  boardMembers: [{ name: "", title: "", affiliation: "" }, { name: "", title: "", affiliation: "" }, { name: "", title: "", affiliation: "" }],
  contactEmail: "", frequency: "continuous", languages: "English",
  commitPeerReview: false, commitEthics: false, commitNoPredatory: false,
};

const defaultState: JournalState = {
  proposal: defaultProposal,
  governanceComplete: false,
  policiesAccepted: false,
  technicalSetupComplete: false,
  reviewStatus: "under-review",
  launchChecklist: { editorialBoard: false, submissionSystem: false, callForPapers: false, publiclyListed: false },
  launched: false,
};

interface JournalContextType {
  state: JournalState;
  setState: React.Dispatch<React.SetStateAction<JournalState>>;
  updateProposal: (data: Partial<JournalProposalData>) => void;
}

const JournalContext = createContext<JournalContextType | undefined>(undefined);

export function JournalProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<JournalState>(defaultState);

  const updateProposal = (data: Partial<JournalProposalData>) => {
    setState(prev => ({ ...prev, proposal: { ...prev.proposal, ...data } }));
  };

  return (
    <JournalContext.Provider value={{ state, setState, updateProposal }}>
      {children}
    </JournalContext.Provider>
  );
}

export function useJournal() {
  const ctx = useContext(JournalContext);
  if (!ctx) throw new Error("useJournal must be used within JournalProvider");
  return ctx;
}
