import { IncidentReport } from '@services/incident.service'

export const flatListClassName = 'm-6 mt-5 py-2 border border-neutral20 rounded-[8px]'
export const headerClassName = 'row-center border-b pb-2 border-neutral20 px-4'
export const itemClassName = 'row-center px-4 py-4 border-neutral30'
export const labelClassName = 'text-neutral70'

export interface PreviewProps {
  allowEdit: boolean
  incident?: IncidentReport
}


// export const TAKEN_ACTIONS = [
//   { key: "firstAid", label: "First aid administered" },
//   { key: "emergencyServices", label: "Emergency services contacted" },
//   { key: "supervisorNotified", label: "Supervisor notified" },
//   { key: "areaMadeSafe", label: "Area made safe" },
//   { key: "workStopped", label: "Work stopped" },
//   { key: "equipmentFailure", label: "Equipment Failure" },
//   { key: "otherAction", label: "Other" },
// ];


export const INCIDENT_TYPES = [
  { key: "injuryIllness", label: "Injury / Illness" },
  { key: "nearMiss", label: "Near Miss" },
  { key: "propertyDamage", label: "Property Damage" },
  { key: "environmentalSpill", label: "Environmental Spill / Breach" },
  { key: "unsafeAct", label: "Unsafe Act of Condition" },
  { key: "equipmentFailure", label: "Equipment Failure" },
  { key: "other", label: "Other" },
];
