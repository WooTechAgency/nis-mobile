import { images } from '@assets/images';
import { Button, Image } from '@components/ui';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Keyboard, View } from 'react-native';
import { Asset } from 'react-native-image-picker';
import * as yup from 'yup';
import { DailyAssessmentSteps, useAssessmentContext, } from '../../context';
import { HazardItem } from '../components/hazard-item';

export interface HazardForm {
  description?: string;
  medias?: Asset[];
  likelihoodState?: string;
  consequenceState?: string;
  consequenceDes?: string;
  initialRating?: string;
  controlMeasure?: string;
  residualRiskRating?: string;
}

export interface HazardsForm {
  haveHazards?: boolean;
  hazards?: HazardForm[];
}

const hazardDefault = {
  description: '',
}

const formSchema = yup.object().shape({
  haveHazards: yup.boolean().notRequired(),
  hazards: yup
    .array()
    .notRequired()
    .of(
      yup.object({
        description: yup.string().notRequired(),
        medias: yup.mixed().notRequired(),
        likelihoodState: yup.string().notRequired(),
        consequenceState: yup.date().notRequired(),
        consequenceDes: yup.string().notRequired(),
        initialRating: yup.string().notRequired(),
        controlMeasure: yup.string().notRequired(),
        residualRiskRating: yup.string().notRequired()
      })
    ),
});

export default function StepHazards() {
  const { setAssessment, assessment: { completedSteps } } = useAssessmentContext();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, },
  } = useForm({
    defaultValues: {},
    mode: 'onChange',
    resolver: yupResolver(formSchema),
  });


  const { fields, append, remove } = useFieldArray({
    control,
    name: 'hazards',
  });

  const onBack = () => {
    setAssessment((prev) => ({ ...prev, selectedIndex: DailyAssessmentSteps.General }))
  }

  const onSubmit = (form: HazardForm) => {
    const newCompletedSteps = new Set([DailyAssessmentSteps.Hazards, ...(completedSteps || [])]);
    setAssessment((prev) => ({
      ...prev,
      hazard: form,
      selectedIndex: DailyAssessmentSteps.FirstAid,
      completedSteps: Array.from(newCompletedSteps)
    }))
  }

  const addField = () => {
    Keyboard.dismiss()
    append(hazardDefault);
  };


  return (
    <View className='mt-6 gap-y-8'>
      {fields.map((item, index) => {
        return (
          <View key={item.id} style={{ zIndex: 50 - index }}>
            <HazardItem
              index={index}
              classNameWrap='mt-6'
              control={control}
              setValue={setValue}
              errors={errors}
              name='signees'
            />
          </View>
        );
      })}
      <Button
        onPress={addField}
        iconButton={<Image source={images.plus} className='w-8 h-8' />}
        label='Add Hazard'
        type='small'
      />
      <View className='mt-6 flex-row gap-x-6'>
        <Button label='Back' onPress={onBack} type='outlined' className='flex-1' />
        <Button label='Save' onPress={handleSubmit(onSubmit)} className='flex-1' />
      </View>
    </View>
  )
}