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
import { isIphone } from '@constants/app.constants';

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
        name: yup.string().trim().required('Name is required!'),
        role: yup.string().trim().required('Role is required!'),
        thirdParty: yup.boolean().notRequired(),
        email: yup.string().trim().when('thirdParty', {
          is: true,
          then: (schema) => schema.required('Email is required').email('Invalid Email format'),
          otherwise: (schema) => schema.strip()
        }),
        phoneNumber: yup.string().trim().when('thirdParty', {
          is: true,
          then: (schema) => schema
            .required('Phone number is required')
            .test('phone-format', 'Only digits and at most one +', function (value) {
              if (!value) return true; // Allow empty values since it's not required
              const phoneRegex = /^\+?[0-9]+$/;
              const plusCount = (value.match(/\+/g) || []).length;
              return phoneRegex.test(value) && plusCount <= 1;
            })
          ,
          otherwise: (schema) => schema.strip()
        }),
        injured: yup.boolean().notRequired(),
        treatment: yup.string().trim().when('injured', {
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
          then: (schema) => schema.trim().required("Description is required").min(10, "Description must be at least 10 characters."),
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

  const { data: incidentTypes } = useGetIncidentTypes(incident?.incidentTypes || []);
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    trigger,
    getValues,
    formState: { errors, },
  } = useForm({
    defaultValues: {
      ...incident,
      incidentTypes: incidentTypes,
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

  useEffect(() => {
    if (!!incidentTypes) {
      setValue('incidentTypes', incidentTypes)
    }
  }, [incidentTypes])

  const onBack = () => {
    setIncident((prev) => ({ ...prev, selectedIndex: 1 }))
  }

  const onSubmit = (form: IncidentForm) => {
    form = { ...form, incidentTypes: form.incidentTypes?.filter((item) => item.selected) }
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
      {isIphone && <Title label='Who was involved and what happened?' />}
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
        className='bg-teal20 rounded-[8px] h-9 flex-row items-center self-end sm:self-start px-2'
      >
        <Image source={images.plus} className='w-8 h-8' />
        <Text className='text-[12px] font-medium'>Add person</Text>
      </Button>
      <Wrapper className='mt-[0px]'>
        <View className='gap-y-4'>
          <Title label='Incident Type' className='text-base sm:mt-8' />
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