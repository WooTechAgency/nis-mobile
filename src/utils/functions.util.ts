import ErrorModal from '@components/modal/error-modal';
import { consequenceOptions, likeliHoodOptions, riskRating } from '@screens/main/daily-assessment/config.assessment';
import { HazardForm } from '@screens/main/daily-assessment/create-daily-assessment/steps/step-hazards';
import { IUser } from '@services/authentication.service';
import { UpdateHazardRequest } from '@services/dsra.service';
import { IRole } from '@services/role.service';

export const showErrorMessage = ({title, message, btnText}:{title?: string, message: string, btnText?:string}) => {
  ErrorModal.show({title, message, btnText})
};


export const formatBytes = (bytes?: number | null, decimals = 2) => {
  if (!bytes || bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
}

export const formatRole = (role: IRole | undefined) =>{
  if(role){
    return {...role,value: role.id,label: role.name }
  }
  return undefined

}


export const convertHazardFromBE = (hazards: UpdateHazardRequest[]) => {
  return hazards.map((hazard) => ({
    ...hazard,
    consequenceDes: hazard.consequence_description,
    controlMeasure: hazard.control_measure,
    likelihood: likeliHoodOptions.find((option) => option.title === hazard.likelihood),
    consequence: consequenceOptions.find((option) => option.title === hazard.consequence),
    initialRiskRating: riskRating.flat().find((option) => option.title === hazard.initial_risk_rating),
    residualRiskRating: riskRating.flat().find((option) => option.title === hazard.residual_risk_rating),
    medias: hazard?.medias?.map((_media) => ({
      uri: _media?.url,
    })),
  }))
}     


export const convertHazardForm = (hazards: HazardForm[]) => {
  return hazards.map((hazard) => ({
      description: hazard.description || '',
      likelihood: hazard.likelihood?.title || '',
      consequence: hazard.consequence?.title || '',
      consequence_description: hazard.consequenceDes || '',
      initial_risk_rating: hazard.initialRiskRating?.title || '',
      control_measure: hazard.controlMeasure || '',
      residual_risk_rating: hazard.residualRiskRating?.title,
      media: hazard.medias?.map((media) => media.id) || [],
  }))
}     

