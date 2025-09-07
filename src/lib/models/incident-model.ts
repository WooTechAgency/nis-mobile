import { ObjectSchema } from 'realm';
import { Realm,  } from '@realm/react'


export class IncidentModel extends Realm.Object {
  public id!: string;
  public generalInfo!: string;
  public incident!: string;
  public action!: string;
  public witness!: string;
  public singing!: string;
  public completedSteps!: string;
  public creatorId!: number;


  static schema: ObjectSchema = {
    name: 'FieldNote',
    primaryKey: 'id',
    properties: {
      id: {type: 'string' },
      generalInfo: 'string?',
      incident: 'string?',
      action: 'string?',
      witness: 'string?',
      singing: 'string?',
      completedSteps: 'string?',
      creatorId: 'int?',
      createdAt: { type: 'date', default: new Date() },
    },
  };
}
