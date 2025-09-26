import { images } from '@assets/images';
import Title from '@components/title';
import { Button, Image, Text } from '@components/ui';
import { yupResolver } from '@hookform/resolvers/yup';
import { DocumentPickerResponse } from '@react-native-documents/picker';
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Keyboard, View } from 'react-native';
import * as yup from 'yup';
import { IncidentSteps, useIncidentContext } from '../../context';
import { WitnessItem } from '../components/witness-item';
import { navigate } from '@routes/navigationRef';
import { RouteName } from '@routes/types';
import { useUpsertIncident } from '../../useUpsertIncident';

export interface Witness {
  name?: string;
  phone?: string;
  email?: string;
  documents?: (DocumentPickerResponse & { id: number })[];
}

export interface WitnessForm {
  witnesses: Witness[];
}
const formSchema = yup.object().shape(
  {
    witnesses: yup
      .array()
      .notRequired()
      .of(
        yup.object({
          name: yup.string().required('Name is required'),
          phone: yup.string().required('Phone is required'),
          email: yup.string().required('Email is required').email('Email is invalid'),
          documents: yup.array().notRequired(),
        }))
  },
);

export default function StepWitness({ editingMode }: { editingMode: boolean }) {
  const { upsertIncident } = useUpsertIncident()
  const { setIncident, incident: { completedSteps, witness } } = useIncidentContext()
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, },
  } = useForm({
    defaultValues: {
      ...witness
    },
    mode: 'onSubmit',
    resolver: yupResolver(formSchema),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'witnesses',
  });


  const onBack = () => {
    setIncident((prev) => ({ ...prev, selectedIndex: IncidentSteps.Action }))
  }

  const addField = () => {
    Keyboard.dismiss()
    append({});
  };

  const onSubmit = (form: WitnessForm) => {
    const newCompletedSteps = new Set([IncidentSteps.Witness, ...(completedSteps || [])]);
    setIncident((prev) => ({
      ...prev,
      witness: form,
      selectedIndex: IncidentSteps.SignOff,
      completedSteps: Array.from(newCompletedSteps)
    }))
    editingMode && navigate(RouteName.PreviewIncident)
    upsertIncident({ witness: form, completedSteps: Array.from(newCompletedSteps) })
  }

  return (
    <View className=''>
      <Title label='Are there any witnesses?' className='mt-8' />
      {fields.length > 0 ? fields.map((item, index) => {
        return (
          <View key={item.id} style={{ zIndex: 50 - index }}>
            <WitnessItem
              index={index}
              classNameWrap='mt-6'
              control={control}
              setValue={setValue}
              errors={errors}
              name={`witnesses.${index}`}
              remove={remove}
            />
          </View>
        );
      }) :
        <View className='border border-neutral40 p-7 rounded-[20px] mt-8 '>
          <Text className='text-neutral60'>No known witnesses</Text>
        </View>
      }
      {/* end */}
      <Button
        onPress={addField}
        className='w-[130px] h-[36px] flex-row center self-start bg-teal20 rounded-[8px] mt-8'
      >
        <Image source={images.plus} className='w-8 h-8' />
        <Text className='text-[12px] font-medium'>Add witness</Text>
      </Button>
      <View className='mt-6 flex-row gap-x-6'>
        <Button label='Back' onPress={onBack} type='outlined' className='flex-1 bg-transparent' />
        <Button label={editingMode ? 'Save' : 'Next'} onPress={handleSubmit(onSubmit)} className='flex-1' />
      </View>
    </View>
  )
}