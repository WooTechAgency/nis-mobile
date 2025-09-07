import { useAppSelector } from '@hooks/common';
import { IncidentModel } from '@lib/models/incident-model';
import { useRealm } from '@realm/react';
import { Incident, useIncidentContext } from './context';

export const useUpsertIncident = () => {
  const {  incident: { id } } = useIncidentContext();

  const { userInfo } = useAppSelector((state) => state.authentication)
  const realm = useRealm();

  const upsertIncident = ( payload: Partial<Incident>  ) => {
    const { generalInfo, action,witness, singing,incident ,completedSteps} = payload;
    const newGeneralInfo = generalInfo && JSON.stringify(generalInfo);
    const newAction = action && JSON.stringify(action );
    const newWitness = witness && JSON.stringify(witness );
    const newIncident = incident && JSON.stringify(incident );
    const newSigning = singing && JSON.stringify(singing);
    const newCompletedSteps = completedSteps && JSON.stringify(completedSteps);
    try{
     realm.write(() => {
        realm.create(
          IncidentModel,
           {
              id: id,
             generalInfo:newGeneralInfo,
             action:newAction,
             witness:newWitness,
             incident:newIncident,
             singing:newSigning,
             completedSteps:newCompletedSteps,
             creatorId: userInfo?.id
          }, 
         Realm.UpdateMode.Modified
      );
      });
    }catch(e){
      console.log('Error upsertIncident ', e)
    }
    
  }
  return {upsertIncident}

}