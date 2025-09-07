import { DailyAssessmentModel } from '@lib/models/daily-assessment-model';
import { IncidentModel } from '@lib/models/incident-model';
import { DailyAssessment } from '@screens/main/daily-assessment/context';
import { Incident } from '@screens/main/incidents/context';

export const convertModelToIncident = (data: IncidentModel): Partial<Incident> => {
  const {id, generalInfo,  incident,  action, witness, singing, completedSteps } = data
  
  return {
    id: id || '0', 
    generalInfo: JSON.parse(generalInfo || '{}'),
    incident:  incident ? JSON.parse(incident || '{}') : undefined,
    action:  action ? JSON.parse(action || '{}') : undefined,
    witness:  witness ? JSON.parse(witness || '{}') : undefined,
    singing: singing? JSON.parse(singing || '{}') : undefined,
    completedSteps:  JSON.parse(completedSteps || '[]'),
  }
}

export const convertModelToDailyAssessment = (data: DailyAssessmentModel): Partial<DailyAssessment> => {
  const {id, generalInfo,  hazard,  firstAid, checkList, singing, completedSteps } = data

  return {
    id: id || '0', 
    generalInfo: JSON.parse(generalInfo || '{}'),
    hazard:  hazard ? JSON.parse(hazard || '{}') : undefined,
    firstAid:  firstAid ? JSON.parse(firstAid || '{}') : undefined,
    checkList:  checkList ? JSON.parse(checkList || '{}') : undefined,
    singing: singing? JSON.parse(singing || '{}') : undefined,
    completedSteps:  JSON.parse(completedSteps || '[]'),
  }
}