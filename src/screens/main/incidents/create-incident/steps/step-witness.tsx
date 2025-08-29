import { images } from '@assets/images';
import Title from '@components/title';
import { Button, Image, Text, Wrapper } from '@components/ui';
import { DocumentForm } from '@components/ui/DocumentForm';
import { TextInput } from '@components/ui/TextInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDocumentPicker } from '@hooks/useDocumentPicker';
import { DocumentPickerResponse } from '@react-native-documents/picker';
import React from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import * as yup from 'yup';
import { IncidentSteps, useIncidentContext } from '../../context';

export interface WitnessForm {
  name?: string;
  phone?: string;
  email?: string;
  documents?: DocumentPickerResponse[];
}
const formSchema = yup.object().shape({
  name: yup.string().notRequired(),
  phone: yup.string().notRequired(),
  email: yup.string().notRequired(),
  documents: yup.array().notRequired(),
});

export default function StepWitness() {
  const { setIncident, incident: { completedSteps } } = useIncidentContext()
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, },
  } = useForm({
    defaultValues: {},
    mode: 'onSubmit',
    resolver: yupResolver(formSchema),
  });
  const { pickDocuments } = useDocumentPicker({ setValue, control, name: 'document' })

  const onBack = () => {
    setIncident((prev) => ({ ...prev, selectedIndex: IncidentSteps.General }))
  }

  const onSubmit = (form: WitnessForm) => {
    const newCompletedSteps = new Set([IncidentSteps.Witness, ...(completedSteps || [])]);
    setIncident((prev) => ({
      ...prev,
      witness: form,
      selectedIndex: IncidentSteps.SignOff,
      completedSteps: Array.from(newCompletedSteps)
    }))
  }

  return (
    <Wrapper>
      <Title label='Witnesses' />
      <>
        <TextInput
          classNameWrap='mt-6'
          errors={errors}
          control={control}
          name='name'
          label='Name'
          placeholder='Enter name'
        />
        <View className='flex-row items-center gap-x-4 mt-6'>
          <TextInput
            classNameWrap='flex-1'
            errors={errors}
            control={control}
            name='phone'
            label='Phone'
            placeholder='Enter phone'
          />
          <TextInput
            classNameWrap='flex-1'
            errors={errors}
            control={control}
            name='email'
            label='Email'
            keyboardType='email-address'
            autoCapitalize='none'
            placeholder='Enter email'
          />
        </View>
      </>
      <>
        <Title label='Statement' className='text-base mt-4 mb-2' />
        <DocumentForm
          name='document'
          setValue={setValue}
          control={control}
        />
      </>
      <Button
        className='w-[130px] h-[36px] flex-row center self-start bg-teal20 rounded-[8px] mt-8'
      >
        <Image source={images.plus} className='w-8 h-8' />
        <Text className='text-[12px] font-medium'>Add witness</Text>
      </Button>
      <View className='mt-6 flex-row gap-x-6'>
        <Button label='Back' onPress={onBack} type='outlined' className='flex-1' />
        <Button label='Next' onPress={handleSubmit(onSubmit)} className='flex-1' />
      </View>
    </Wrapper>
  )
}