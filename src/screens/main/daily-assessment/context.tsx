// UserContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { HazardForm } from './create-daily-assessment/steps/step-hazards';
import { GeneralForm } from './create-daily-assessment/steps/step-general-info';
import { FirstAidForm } from './create-daily-assessment/steps/step-first-aid';
import { CheckListForm } from './create-daily-assessment/steps/step-checklist';

interface GeneralInformation extends GeneralForm {
}
interface Hazard extends HazardForm {
}
interface FirstAid extends FirstAidForm {
}

export enum DailyAssessmentSteps {
  General = 1,
  Hazards = 2,
  FirstAid = 3,
  CheckList = 4,
  Signing = 5,
}

export type DailyAssessment = {
  generalInfo?: GeneralInformation | undefined
  hazard?: Hazard | undefined
  firstAid?: FirstAid | undefined
  checkList?: CheckListForm | undefined
  selectedIndex: number;
};

type DailyAssessmentContextType = {
  assessment: DailyAssessment | null;
  setAssessment: React.Dispatch<React.SetStateAction<DailyAssessment | null>>;
};

const DailyAssessmentContext = createContext<DailyAssessmentContextType | undefined>(undefined);

const initialAssessment: DailyAssessment = {
  generalInfo: undefined,
  hazard: undefined,
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
