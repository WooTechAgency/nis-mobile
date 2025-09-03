// UserContext.tsx
import React, { ReactNode, createContext, useContext, useState } from 'react';
import { ActionForm } from './create-incident/steps/step-action';
import { GeneralForm } from './create-incident/steps/step-general-info';
import { IncidentForm } from './create-incident/steps/step-incident';
import { SignOffForm } from './create-incident/steps/step-sign-off';
import { WitnessForm } from './create-incident/steps/step-witness';

export enum IncidentSteps {
  General = 1,
  Incident = 2,
  Action = 3,
  Witness = 4,
  SignOff = 5,
}

export type Incident = {
  generalInfo?: GeneralForm | undefined
  incident?: IncidentForm | undefined
  action?: ActionForm | undefined
  witness?: WitnessForm | undefined
  singing?: SignOffForm | undefined
  selectedIndex: number;
  enableScroll?: boolean
  completedSteps?: number[]
};

type IncidentContextType = {
  incident: Incident;
  setIncident: React.Dispatch<React.SetStateAction<Incident | null>>;
};

const IncidentContext = createContext<IncidentContextType | undefined>(undefined);

const initialAssessment: Incident = {
  generalInfo: undefined,
  incident: undefined,
  action: undefined,
  witness: undefined,
  singing: undefined,
  selectedIndex: IncidentSteps.General,
  enableScroll: true,
  completedSteps: []
}

export const IncidentProvider = ({ children }: { children: ReactNode }) => {
  const [incident, setIncident] = useState<Incident | null>(initialAssessment);

  return (
    <IncidentContext.Provider value={{ incident, setIncident }}>
      {children}
    </IncidentContext.Provider>
  );
};

// Custom hook để sử dụng dễ hơn
export const useIncidentContext = () => {
  const context = useContext(IncidentContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
