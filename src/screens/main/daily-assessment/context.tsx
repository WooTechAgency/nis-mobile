// UserContext.tsx
import React, { ReactNode, createContext, useContext, useState } from 'react';
import { CheckListForm } from './create-daily-assessment/steps/step-checklist';
import { FirstAidForm } from './create-daily-assessment/steps/step-first-aid';
import { GeneralForm } from './create-daily-assessment/steps/step-general-info';
import { HazardsForm } from './create-daily-assessment/steps/step-hazards';
import { SigningForm } from './create-daily-assessment/steps/step-sign-off';

export enum DailyAssessmentSteps {
  General = 1,
  Hazards = 2,
  FirstAid = 3,
  CheckList = 4,
  Signing = 5,
}

export type DailyAssessment = {
  id?: string;
  generalInfo?: GeneralForm | undefined
  hazard?: HazardsForm | undefined
  firstAid?: FirstAidForm | undefined
  checkList?: CheckListForm | undefined
  singing?: SigningForm | undefined
  selectedIndex: number;
  enableScroll?: boolean
  completedSteps?: number[]
};

type DailyAssessmentContextType = {
  assessment: DailyAssessment;
  setAssessment: React.Dispatch<React.SetStateAction<DailyAssessment | null>>;
};

const DailyAssessmentContext = createContext<DailyAssessmentContextType | undefined>(undefined);

export const initialAssessment: DailyAssessment = {
  id: `${new Date().getTime()}`,
  generalInfo: undefined,
  hazard: undefined,
  firstAid: undefined,
  checkList: undefined,
  selectedIndex: DailyAssessmentSteps.General,
  enableScroll: true,
  completedSteps: []
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
