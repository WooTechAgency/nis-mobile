import Title from '@components/title';
import { Button, CheckboxDescriptionForm, Text, Wrapper } from '@components/ui';
import { yupResolver } from '@hookform/resolvers/yup';
import { navigate } from '@routes/navigationRef';
import { RouteName } from '@routes/types';
import { useGetTakenActions } from '@services/hooks/incident/useGetTakenActions';
import { getMessageError } from '@utils/common.util';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, View } from 'react-native';
import * as yup from 'yup';
import { IncidentSteps, useIncidentContext } from '../../context';
import { useUpsertIncident } from '../../useUpsertIncident';
import { isIphone } from '@constants/app.constants';


export interface Action {
  id: number,
  name: string, // label
  description: string
  selected: boolean
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
        id: yup.number().required(),
        selected: yup.boolean(),
        description: yup.string().when("selected", {
          is: true,
          then: (schema) => schema.trim().required("Description is required").min(10, "Description must be at least 10 characters."),
          otherwise: (schema) => schema.notRequired(),
        }),
      })
    ),
  actionSelected: yup
    .boolean()
    .oneOf([true], "Please select at least one immediate action taken"),
});

export default function StepAction({ editingMode }: { editingMode: boolean }) {
  const { upsertIncident } = useUpsertIncident()

  const { setIncident, incident: { completedSteps, action } } = useIncidentContext()
  const { data: actions } = useGetTakenActions(action?.actions || []);
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors, },
  } = useForm({
    defaultValues: {
      actions: actions || [],
      actionSelected: action?.actionSelected || false,
    },
    mode: 'onSubmit',
    resolver: yupResolver(formSchema),
  });

  useEffect(() => {
    if (!action?.actions && !!actions) {
      setValue('actions', actions)
    }
  }, [action?.actions, actions])

  const onBack = () => {
    setIncident((prev) => ({ ...prev, selectedIndex: IncidentSteps.Incident }))
  }

  const onSubmit = (form: ActionForm) => {
    form = { ...form, actions: form.actions?.filter((item) => item.selected) }
    Keyboard.dismiss()
    const newCompletedSteps = new Set([IncidentSteps.Action, ...(completedSteps || [])]);
    setIncident((prev) => ({
      ...prev,
      action: form,
      selectedIndex: IncidentSteps.Witness,
      completedSteps: Array.from(newCompletedSteps)
    }))
    upsertIncident({ action: form, completedSteps: Array.from(newCompletedSteps) })
    editingMode && navigate(RouteName.PreviewIncident)

  }

  const actionsSelectedError = getMessageError(errors, 'actionSelected')

  return (
    <>
      {isIphone && <Title label='What action was taken?' className='my-6' />}
      <Wrapper className='mt-[0px] sm:mt-[32px]'>
        <View className='gap-y-4'>
          <Title label='Immediate Action Taken' className='text-base' />
          {actions?.map((action, index) => {
            return (
              <View key={index}>
                <CheckboxDescriptionForm
                  watch={watch}
                  setValue={setValue}
                  errors={errors}
                  control={control}
                  checkboxName={`actions.${index}.selected`}
                  label={action.name}
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
    </>
  )
}