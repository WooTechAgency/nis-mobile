import { images } from '@assets/images';
import Title from '@components/title';
import { Button, CheckboxDescriptionForm, Image, Text, Wrapper } from '@components/ui';
import { yupResolver } from '@hookform/resolvers/yup';
import { navigate } from '@routes/navigationRef';
import { RouteName } from '@routes/types';
import { useGetIncidentTypes } from '@services/hooks/incident/useGetIncidentTypes';
import { getMessageError } from '@utils/common.util';
import React, { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Keyboard, View } from 'react-native';
import * as yup from 'yup';
import { IncidentSteps, useIncidentContext } from '../../context';
import { InvolvedPersonItem } from '../components/involved-person-item';
import { useUpsertIncident } from '../../useUpsertIncident';

export interface IncidentType {
  id: number,
  name: string, // label
  description: string
  selected: boolean
}
export interface InvolvedPerson {
  name?: string;
  role?: string;
  thirdParty?: boolean;
  email?: string; // third-party contact details
  phoneNumber?: string; // third-party contact details
  injured?: boolean;
  treatment?: string; // injured contact detail
}
export interface IncidentForm {
  involvedPersons: InvolvedPerson[]
  incidentTypes: IncidentType[]
  incidentSelected?: boolean
}
const formSchema = yup.object().shape({
  involvedPersons: yup
    .array()
    .notRequired()
    .of(
      yup.object({
        name: yup.string().required('Name is required!'),
        role: yup.string().required('Role is required!'),
        thirdParty: yup.boolean().notRequired(),
        email: yup.string().when('thirdParty', {
          is: true,
          then: (schema) => schema.required('Email is required').email('Email is invalid'),
          otherwise: (schema) => schema.strip()
        }),
        phoneNumber: yup.string().when('thirdParty', {
          is: true,
          then: (schema) => schema.required('Phone number is required'),
          otherwise: (schema) => schema.strip()
        }),
        injured: yup.boolean().notRequired(),
        treatment: yup.string().when('injured', {
          is: true,
          then: (schema) => schema.required('Treatment is required'),
          otherwise: (schema) => schema.strip()
        }),
      })
    ),
  incidentTypes: yup
    .array()
    .notRequired()
    .of(
      yup.object({
        id: yup.number().required(),
        selected: yup.boolean(),
        description: yup.string().when("selected", {
          is: true,
          then: (schema) => schema.required("Description is required"),
          otherwise: (schema) => schema.notRequired(),
        }),
      })
    ),
  incidentSelected: yup
    .boolean()
    .oneOf([true], "Please select at least one incident type"),
});

export default function StepIncident({ editingMode }: { editingMode: boolean }) {
  const { upsertIncident } = useUpsertIncident()

  const { setIncident, incident: { completedSteps, incident } } = useIncidentContext()
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors, },
  } = useForm({
    defaultValues: {
      ...incident,
      incidentTypes: incident?.incidentTypes,
      involvedPersons: incident?.involvedPersons || [{}],
      incidentSelected: incident?.incidentSelected || false,
    },
    mode: 'onSubmit',
    resolver: yupResolver(formSchema),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'involvedPersons',
  });

  const { data: incidentTypes } = useGetIncidentTypes();

  useEffect(() => {
    if (!incident?.incidentTypes && !!incidentTypes) {
      setValue('incidentTypes', incidentTypes)
    }
  }, [incident?.incidentTypes, incidentTypes])

  const onBack = () => {
    setIncident((prev) => ({ ...prev, selectedIndex: 1 }))
  }

  const onSubmit = (form: IncidentForm) => {
    console.log('form ', form)

    const newCompletedSteps = new Set([IncidentSteps.Incident, ...(completedSteps || [])]);
    setIncident((prev) => ({
      ...prev,
      incident: form,
      selectedIndex: IncidentSteps.Action,
      completedSteps: Array.from(newCompletedSteps)
    }))
    upsertIncident({ incident: form, completedSteps: Array.from(newCompletedSteps) })
    editingMode && navigate(RouteName.PreviewIncident)
  }

  const addField = () => {
    Keyboard.dismiss()
    append({});
  };

  const incidentTypeError = getMessageError(errors, 'incidentSelected')

  return (
    <View className='gap-6 mt-8'>
      {
        fields.length > 0 && fields.map((item, index) => {
          return (
            <View key={item.id} style={{ zIndex: 50 - index }}>
              <InvolvedPersonItem
                index={index}
                control={control}
                setValue={setValue}
                errors={errors}
                name={`involvedPersons.${index}`}
                remove={remove}
              />
            </View>
          );
        })
      }
      <Button
        onPress={addField}
        className='bg-teal20 rounded-[8px] h-9 flex-row items-center self-start px-2'
      >
        <Image source={images.plus} className='w-8 h-8' />
        <Text className='text-[12px] font-medium'>Add person</Text>
      </Button>
      <Wrapper className='mt-[0px]'>
        <View className='gap-y-4'>
          <Title label='Incident Type' className='text-base mt-8' />
          <Text>Select all that apply</Text>
          {incidentTypes?.map((type, index) => {
            return (
              <View key={index}>
                <CheckboxDescriptionForm
                  watch={watch}
                  setValue={setValue}
                  errors={errors}
                  control={control}
                  checkboxName={`incidentTypes.${index}.selected`}
                  label={type.name}
                  descriptionName={`incidentTypes.${index}.description`}
                  placeholderDescription='Describe the incident that occurred'
                  trigger={trigger}
                  selectedName={'incidentSelected'}
                  rootName='incidentTypes'
                />
              </View>
            )
          })}
          {incidentTypeError && <Text className='text-red text-[12px] ml-4'>{incidentTypeError}</Text>}
        </View>
      </Wrapper>
      <View className='mt-6 flex-row gap-x-6'>
        <Button label='Back' onPress={onBack} type='outlined' className='flex-1' />
        <Button
          label={editingMode ? 'Save' : 'Next'}
          onPress={handleSubmit(onSubmit)}
          className='flex-1'
        />
      </View>
    </View>
  )
}