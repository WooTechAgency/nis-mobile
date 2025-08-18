import Title from '@components/title';
import { MediaForm, SelectOption, SelectRating, Wrapper } from '@components/ui';
import { TextInput } from '@components/ui/TextInput';
import React from 'react';
import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';
import { consequenceOptions, likeliHoodOptions } from '../../config.assessment';

interface Props {
  index: number
  classNameWrap?: string;
  setValue: UseFormSetValue<any>;
  name?: string;
  errors?: FieldErrors;
  control: Control<any, any>;
}

export function HazardItem({ control, classNameWrap, errors, setValue, index, name }: Props) {
  return (
    <Wrapper className={` ${classNameWrap} gap-y-8`}>
      <Title label='Hazard 1' />
      <TextInput
        errors={errors}
        control={control}
        name={`${name}.${index}.description`}
        label='Please describe the hazard'
        placeholder='Describe the hazard........'
        multiline
        hasVoice
      />
      <MediaForm
        isRadio
        control={control}
        name={`${name}.${index}.medias`}
        setValue={setValue}
        label='Photos'
      />
      <SelectOption
        control={control}
        setValue={setValue}
        name={`${name}.${index}.likelihood`}
        label='What is its likelihood?'
        options={likeliHoodOptions}
      />
      <SelectOption
        control={control}
        setValue={setValue}
        name={`${name}.${index}.consequence`}
        label='What are the consequences??'
        options={consequenceOptions}
      />
      <TextInput
        errors={errors}
        control={control}
        name={`${name}.${index}.controlMeasures`}
        label='What are the control measures?'
        placeholder='Describe the control measures....'
        multiline
      />
      <SelectRating
        control={control}
        setValue={setValue}
        name='initialRiskRating'
        label='Initial Risk Rating'
      />
      <TextInput
        classNameWrap='mt-6'
        errors={errors}
        control={control}
        name='measure'
        label='What are the control measures?'
        placeholder='Describe the control measures....'
        multiline
      />
      <SelectRating
        control={control}
        setValue={setValue}
        name='residualRiskRating'
        label='What is its likelihood?'
      />
    </Wrapper>
  );
}
