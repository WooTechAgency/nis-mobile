// UserContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GeneralInformation {
  location: string;
  // date: string;
}


export enum DailyAssessmentSteps {
  General = 1,
  Hazards = 2,
  FirstAid = 3,
  CheckList = 4,
  Signing = 5,
}

export type DailyAssessment = {
  generalInfo: GeneralInformation | undefined
  selectedIndex: number;
};

type DailyAssessmentContextType = {
  assessment: DailyAssessment | null;
  setAssessment: React.Dispatch<React.SetStateAction<DailyAssessment | null>>;
};

const DailyAssessmentContext = createContext<DailyAssessmentContextType | undefined>(undefined);

const initialAssessment: DailyAssessment = {
  generalInfo: undefined,
  selectedIndex: DailyAssessmentSteps.General,
}

export const DailyAssessmentProvider = ({ children }: { children: ReactNode }) => {
  const [assessment, setAssessment] = useState<DailyAssessment | null>(initialAssessment);

  return (
    <DailyAssessmentContext.Provider value={{ assessment, setAssessment }}>
      {children}
    </DailyAssessmentContext.Provider>
  );
};

// Custom hook để sử dụng dễ hơn
export const useAssessmentContext = () => {
  const context = useContext(DailyAssessmentContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
