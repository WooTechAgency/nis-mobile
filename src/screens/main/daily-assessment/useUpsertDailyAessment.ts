import { useAppSelector } from '@hooks/common';
import { useRealm } from '@realm/react';
import { DailyAssessment, useAssessmentContext } from './context';
import { DailyAssessmentModel } from '@lib/models/daily-assessment-model';

export const useUpsertDailyAssessment = () => {
  const realm = useRealm();
  const {  assessment: { id } } = useAssessmentContext();
  const { userInfo } = useAppSelector((state) => state.authentication)

  const upsertDailyAssessment = ( payload: Partial<DailyAssessment>  ) => {
    const { generalInfo, hazard, firstAid, singing, checkList, completedSteps} = payload;

    try {
     realm.write(() => {
        realm.create(
          DailyAssessmentModel,
           {
              id: id,
             generalInfo: generalInfo && JSON.stringify(generalInfo),
             hazard: hazard && JSON.stringify(hazard ),
             firstAid: firstAid && JSON.stringify(firstAid ),
             checkList: checkList && JSON.stringify(checkList ),
             singing: singing && JSON.stringify(singing),
             completedSteps: completedSteps && JSON.stringify(completedSteps),
             creatorId: userInfo?.id
          }, 
         Realm.UpdateMode.Modified
      );
      });
    } catch(e){
      console.log('Error useUpsertDailyAssessment ', e)
    }
  }

  return {upsertDailyAssessment}

}