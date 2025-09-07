import { ObjectSchema } from 'realm';
import { Realm,  } from '@realm/react'

export class DailyAssessmentModel extends Realm.Object {
  public id!: string;
  public generalInfo!: string;
  public hazard!: string;
  public firstAid!: string;
  public checkList!: string;
  public singing!: string;
  public completedSteps!: string;
  public creatorId!: number;
  public createdAt!: Date;

  static schema: ObjectSchema = {
    name: 'DailyAssessmentModel',
    primaryKey: 'id',
    properties: {
      id: {type: 'string' },
      generalInfo: 'string?',
      hazard: 'string?',
      firstAid: 'string?',
      checkList: 'string?',
      singing: 'string?',
      completedSteps: 'string?',
      creatorId: 'int?',
      createdAt: { type: 'date', default: new Date() },
    },
  };
}
