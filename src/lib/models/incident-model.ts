import { ObjectSchema } from 'realm';
import { Realm,  } from '@realm/react'

export class IncidentModel extends Realm.Object {
  public id!: string;
  public generalInfo!: string;
  public incident: string | undefined;
  public action: string | undefined;
  public witness: string | undefined;
  public singing: string | undefined;
  public completedSteps: string | undefined;
  public creatorId!: number;  
  public createdAt!: number;
  public updatedAt: number  | undefined;

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
      updatedAt: { type: 'date', default: new Date() },
    },
  };
}
