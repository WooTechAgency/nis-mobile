import { images } from '@assets/images';
import Title from '@components/title';
import { Button, CheckboxDescriptionForm, Image, Text, Wrapper, YesNoForm } from '@components/ui';
import { TextInput } from '@components/ui/TextInput';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { View } from 'react-native';
import * as yup from 'yup';
import { IncidentSteps, useIncidentContext } from '../../context';

export interface IncidentForm {
  name?: string;
  role?: string;
  thirdParty?: boolean;
  email?: string; // third-party contact details
  phoneNumber?: string; // third-party contact details
  injured?: boolean;
  treatment?: string; // injured contact detail
  injury?: boolean;
  injuryDes?: string;
}
const formSchema = yup.object().shape({
  name: yup.string().notRequired(),
  role: yup.string().notRequired(),
  thirdParty: yup.boolean().notRequired(),
  email: yup.string().notRequired(),
  phoneNumber: yup.string().notRequired(),
  injured: yup.boolean().notRequired(),
  treatment: yup.string().notRequired(),

  injury: yup.boolean().notRequired(),
  injuryDes: yup.boolean().notRequired(),
});

export default function StepIncident() {
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

  const thirdParty = useWatch({ control, name: 'thirdParty' });
  const injured = useWatch({ control, name: 'injured' });

  const onBack = () => {
    setIncident((prev) => ({ ...prev, selectedIndex: 1 }))

  }
  const onSubmit = (form: IncidentForm) => {
    const newCompletedSteps = new Set([IncidentSteps.Incident, ...(completedSteps || [])]);
    setIncident((prev) => ({
      ...prev,
      incident: form,
      selectedIndex: IncidentSteps.Action,
      completedSteps: Array.from(newCompletedSteps)
    }))
  }

  return (
    <Wrapper className='gap-y-6'>
      {/* Hazard */}
      <Title label='Person(s) Involved' className='text-base' />
      <View className='flex-row items-center gap-x-4  '>
        <TextInput
          control={control}
          setValue={setValue}
          classNameWrap='flex-1'
          name='name'
          label='Name'
          placeholder='Enter name'
        />
        <TextInput
          classNameWrap='flex-1'
          errors={errors}
          control={control}
          name='role'
          label='Role'
          placeholder='Enter role'
        />
      </View>
      <YesNoForm
        isRadio
        control={control}
        setValue={setValue}
        name='thirdParty'
        label='Third-party?'
      />
      {thirdParty &&
        <View className='flex-row items-center gap-x-4  '>
          <TextInput
            control={control}
            setValue={setValue}
            classNameWrap='flex-1'
            name='email'
            label='Email'
            placeholder='Enter email'
          />
          <TextInput
            classNameWrap='flex-1'
            errors={errors}
            control={control}
            name='phoneNumber'
            label='Phone number'
            keyboardType='phone-pad'
            placeholder='Enter phone number'
          />
        </View>
      }
      <YesNoForm
        isRadio
        control={control}
        setValue={setValue}
        name='injured'
        label='Injured?'
      />
      {injured &&
        <TextInput
          control={control}
          setValue={setValue}
          name='treatment'
          label='Treatment required'
          placeholder='Enter treatment'
        />
      }

      <Button
        className='bg-teal20 rounded-[8px] h-9 flex-row items-center self-start px-2'
      >
        <Image source={images.plus} className='w-8 h-8' />
        <Text className='text-[12px] font-medium'>Add person</Text>
      </Button>
      <View className='gap-y-4'>
        <Title label='Incident Type' className='text-base mt-8' />
        <Text>Select all that apply</Text>
        <CheckboxDescriptionForm
          setValue={setValue}
          errors={errors}
          control={control}
          checkboxName='injury'
          label='Injury /  Illness'
          descriptionName='injuryDes'
          labelDescription='Describe incident'
          placeholderDescription='Describe the incident that occurred'
        />
        <CheckboxDescriptionForm
          setValue={setValue}
          errors={errors}
          control={control}
          checkboxName='nearMe'
          label='Near Miss'
          descriptionName='nearMeDescription'
          labelDescription='Describe incident'
          placeholderDescription='Describe the incident that occurred'
        />
      </View>
      <View className='mt-6 flex-row gap-x-6'>
        <Button label='Back' onPress={onBack} type='outlined' className='flex-1' />
        <Button label='Next' onPress={handleSubmit(onSubmit)} className='flex-1' />
      </View>
    </Wrapper>
  )
}