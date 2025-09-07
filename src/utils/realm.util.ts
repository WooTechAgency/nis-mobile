import { IncidentModel } from '@lib/models/incident-model';
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