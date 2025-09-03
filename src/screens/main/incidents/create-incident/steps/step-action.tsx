import Title from '@components/title';
import { Button, CheckboxDescriptionForm, Text, Wrapper } from '@components/ui';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, View } from 'react-native';
import * as yup from 'yup';
import { IncidentSteps, useIncidentContext } from '../../context';
import { getMessageError } from '@utils/common.util';
import { TAKEN_ACTIONS } from '../../config.incident';
import { navigate } from '@routes/navigationRef';
import { RouteName } from '@routes/types';


export interface Action {
  key: string
  selected: boolean
  description: string
}

export interface ActionForm {
  actions: Action[]
  actionSelected: boolean
}
const formSchema = yup.object().shape({
  actions: yup
    .array()
    .notRequired()
    .of(
      yup.object({
        key: yup.string().required(),
        selected: yup.boolean(),
        description: yup.string().when("selected", {
          is: true,
          then: (schema) => schema.required("Description is required"),
          otherwise: (schema) => schema.notRequired(),
        }),
      })
    ),
  actionSelected: yup
    .boolean()
    .oneOf([true], "Please select at least one incident type"),
});

export default function StepAction({ editingMode }: { editingMode: boolean }) {
  const { setIncident, incident: { completedSteps, action } } = useIncidentContext()
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors, },
  } = useForm({
    defaultValues: {
      actions: action?.actions || TAKEN_ACTIONS.map((i) => ({
        key: i.key,
        selected: false,
        description: "",
      })),
      actionSelected: action?.actionSelected || false,
    },
    mode: 'onSubmit',
    resolver: yupResolver(formSchema),
  });

  const onBack = () => {
    setIncident((prev) => ({ ...prev, selectedIndex: IncidentSteps.Incident }))
  }

  const onSubmit = (form: ActionForm) => {
    Keyboard.dismiss()
    const newCompletedSteps = new Set([IncidentSteps.Action, ...(completedSteps || [])]);
    setIncident((prev) => ({
      ...prev,
      action: form,
      selectedIndex: IncidentSteps.Witness,
      completedSteps: Array.from(newCompletedSteps)
    }))
    editingMode && navigate(RouteName.PreviewIncident)
  }

  const actionsSelectedError = getMessageError(errors, 'actionSelected')


  return (
    <Wrapper className=''>
      <View className='gap-y-4'>
        <Title label='Immediate Action Taken' className='text-base' />
        {TAKEN_ACTIONS?.map((action, index) => {
          return (
            <View key={index}>
              <CheckboxDescriptionForm
                watch={watch}
                setValue={setValue}
                errors={errors}
                control={control}
                checkboxName={`actions.${index}.selected`}
                label={action.label}
                descriptionName={`actions.${index}.description`}
                placeholderDescription='Please describe the action taken'
                trigger={trigger}
                selectedName='actionSelected'
                rootName='actions'
              />
            </View>
          )
        })}
        {actionsSelectedError && <Text className='text-red text-[12px] ml-4'>{actionsSelectedError}</Text>}
      </View>
      <View className='mt-6 flex-row gap-x-6'>
        <Button label='Back' onPress={onBack} type='outlined' className='flex-1' />
        <Button label={editingMode ? 'Save' : 'Next'} onPress={handleSubmit(onSubmit)} className='flex-1' />
      </View>
    </Wrapper>
  )
}