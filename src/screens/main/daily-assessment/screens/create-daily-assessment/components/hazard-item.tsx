import Title from '@components/title';
import { Button, MediaForm, SelectOption, Wrapper } from '@components/ui';
import { TextInput } from '@components/ui/TextInput';
import { useToggle } from '@hooks/useToggle';
import React, { useEffect } from 'react';
import { Control, FieldErrors, UseFormSetValue, UseFormTrigger, useWatch } from 'react-hook-form';
import { consequenceOptions, likeliHoodOptions, riskRating } from '@screens/main/daily-assessment/config.assessment';
import HazardItemPreview from './previews/hazard-item-preview';
import InitialRiskRating from './initial-risk-rating';
import { SelectRiskRating } from './select-risk-rating';

interface Props {
  index: number
  classNameWrap?: string;
  setValue: UseFormSetValue<any>;
  name: string;
  errors?: FieldErrors;
  control: Control<any, any>;
  onDeleteHazard: (index: number) => void
  trigger: UseFormTrigger<any>
  allowShowPreview?: boolean
  submitted: boolean
}

export function HazardItem({ control, classNameWrap, errors, setValue, index, name, onDeleteHazard, trigger, submitted }: Props) {
  const [showPreview, toggleShowPreview] = useToggle(submitted)
  const likelihood = useWatch({ control, name: `${name}.likelihood` })
  const consequence = useWatch({ control, name: `${name}.consequence` })
  const hazard = useWatch({ control, name })

  const onSaveHazard = async () => {
    const validForm = await trigger(name, { shouldFocus: true })
    if (validForm) {
      toggleShowPreview()
    }
  }

  useEffect(() => {
    if (consequence && likelihood) {
      const colIndex = consequence.index
      const rowIndex = likelihood.index
      const initialRiskRating = riskRating[colIndex + 1][rowIndex]
      setValue(`${name}.initialRiskRating`, initialRiskRating, { shouldValidate: true })
    }
  }, [likelihood, consequence])

  return (
    <Wrapper className={` ${classNameWrap} gap-y-8`}>
      <Title label={`Hazard ${index + 1}`} />
      {showPreview ?
        <HazardItemPreview
          toggleShowPreview={toggleShowPreview}
          index={index}
          onDeleteHazard={onDeleteHazard}
          hazard={hazard}
          submitted={submitted}
        />
        : <>
          <TextInput
            errors={errors}
            control={control}
            name={`${name}.description`}
            label='Please describe the hazard*'
            placeholder='Describe the hazard........'
            multiline
            hasVoice
            setValue={setValue}
          />
          <MediaForm
            isRadio
            control={control}
            name={`${name}.medias`}
            setValue={setValue}
            label='Photos'
          />
          <SelectOption
            control={control}
            setValue={setValue}
            name={`${name}.likelihood`}
            label='What is its likelihood?'
            options={likeliHoodOptions}
            errors={errors}
          />
          <SelectOption
            control={control}
            setValue={setValue}
            name={`${name}.consequence`}
            label='What are the consequences?'
            options={consequenceOptions}
            errors={errors}
          />
          <TextInput
            errors={errors}
            control={control}
            name={`${name}.consequenceDes`}
            label='Please describe the consequences*'
            placeholder='Describe the consequences.....'
            multiline
            hasVoice
            setValue={setValue}
          />
          <InitialRiskRating
            control={control}
            name={`${name}.initialRiskRating`}
            errors={errors}
          />
          <TextInput
            errors={errors}
            control={control}
            name={`${name}.controlMeasure`}
            label='What are the control measures?*'
            placeholder='Describe the control measures....'
            multiline
            hasVoice
            setValue={setValue}
          />
          <SelectRiskRating
            control={control}
            setValue={setValue}
            name={`${name}.residualRiskRating`}
            errors={errors}
          />
          <Button
            onPress={onSaveHazard}
            label='Save Hazard'
            type='small'
            className='w-[130px] self-end'
          />
        </>
      }
    </Wrapper>
  );
}
