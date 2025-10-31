import { images } from '@assets/images';
import { Signature } from '@components/signature';
import Title from '@components/title';
import { Button, Image, Text, Wrapper } from '@components/ui';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppSelector } from '@hooks/common';
import { useNavigation, useRoute } from '@react-navigation/native';
import { navigate } from '@routes/navigationRef';
import { RouteName } from '@routes/types';
import { IRole } from '@services/role.service';
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Keyboard, View } from 'react-native';
import * as yup from 'yup';
import { SigneeItem } from '../components/signee-item';
import { useUpsertDailyAssessment } from '@screens/main/daily-assessment/useUpsertDailyAessment';
import { DailyAssessmentSteps, useAssessmentContext } from '@screens/main/daily-assessment/context';

function Label({ text }: { text: string }) {
  return (
    <View className='flex-row items-start gap-x-2'>
      <Text style={{ fontSize: 4 }}>⚫</Text>
      <Text className='text-black3'>{text}</Text>
    </View>
  )
}
export interface SigneeForm {
  name: string;
  role: IRole;
  signature?: string;
  timestamp?: Date;
}

export interface SigningForm {
  teamLeader: {
    signature?: string;
    timestamp?: string;
  };
  signees: SigneeForm[];
}

const signeeDefault = {
  name: '',
  timestamp: new Date(),
}

const formSchema = yup.object().shape({
  teamLeader: yup.object({
    signature: yup.string().required('Signature is required'),
    timestamp: yup.string().notRequired()
  }),
  signees: yup
    .array()
    .notRequired()
    .of(
      yup.object({
        name: yup.string().trim().required('Name is required'),
        role: yup.object().required('Role is required'),
        signature: yup.string().required('Signature is required'),
        timestamp: yup.date().notRequired()
      })
    ),
});

export default function StepSignOff({ editingMode }: { editingMode: boolean }) {
  const { setAssessment, assessment: { singing } } = useAssessmentContext()
  const { upsertDailyAssessment } = useUpsertDailyAssessment()
  const editable = useRoute().params?.editable as boolean
  const navigation = useNavigation();

  const { userInfo: cachedUser } = useAppSelector((state) => state.authentication)
  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, },
  } = useForm({
    defaultValues: {
      teamLeader: singing?.teamLeader,
      signees: singing?.signees
    },
    mode: 'all',
    resolver: yupResolver(formSchema),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'signees',
  });

  const onSubmit = (form: SigningForm) => {
    if (editable && navigation.setParams) {
      navigation.setParams({ editable: false })
    }
    setAssessment((prev) => ({ ...prev, selectedIndex: DailyAssessmentSteps.Signing, singing: form }))
    navigate(RouteName.DailyAssessmentPreview)
    upsertDailyAssessment({ singing: form })
  }

  const onStartSign = () => {
    setAssessment((prev) => ({ ...prev, selectedIndex: prev?.selectedIndex ?? 0, enableScroll: false }))
  }

  const onEndSign = () => {
    setAssessment((prev) => ({ ...prev, selectedIndex: prev?.selectedIndex ?? 0, enableScroll: true }))
  }

  const onBack = () => {
    setAssessment((prev) => ({ ...prev, selectedIndex: DailyAssessmentSteps.CheckList }))
  }

  const addField = () => {
    Keyboard.dismiss()
    append({ ...signeeDefault, timestamp: new Date() });
  };

  return (
    <View className=''>
      <Wrapper className=''>
        <Title label='Team Leader Acknowledgement' />
        <Text className='mt-8'>By signing below, I acknowledge:</Text>
        <View className='mt-2 ml-2'>
          <Label text='I am the nominated Site Team Leader.' />
          <Label text='All staff have participated and understand site the hazards and controls identified within this Daily Site Risk Assessment. ' />
          <Label text='I am responsible for monitoring site hazards, controls and any changes or circumstances that impact on the risk to workers.  ' />
          <Label text='All applicable SWMS are current and available on site.' />
          <Label text='All staff understand the applicable SWMS.' />
          <Label text='I will report all incidents in accordance with the NIS Incident Reporting Procedure.' />
        </View>
        <Text className='font-semibold mt-6'>{cachedUser?.full_name}</Text>
        <Signature
          classNameWrap='mt-6'
          name='teamLeader'
          onBegin={onStartSign}
          onEnd={onEndSign}
          control={control}
          setValue={setValue}
          errors={errors}
          trigger={trigger}
        />
      </Wrapper>
      <Wrapper>
        <Title label='Daily Sign off' />
        <Text className='mt-8'>By signing below, I acknowledge:</Text>
        <View className='mt-2 ml-2'>
          <Label text='The site has been inspected.' />
          <Label text='I will follow all directives and instructions of the Site Team Leader.' />
          <Label text='The above hazards have been assessed.' />
          <Label text='SWMS control measures are in place.' />
          <Label text='They will work in accordance with this assessment including all additional hazard control measures.' />
          <Label text='I am free from the effects of drugs and alcohol.' />
        </View>
        {fields.map((item, index) => {
          return (
            <View key={item.id} style={{ zIndex: 50 - index }}>
              <SigneeItem
                index={index}
                classNameWrap='mt-6'
                control={control}
                setValue={setValue}
                errors={errors}
                name={`signees.${index}`}
                trigger={trigger}
                remove={remove}
              />
            </View>
          );
        })}
      </Wrapper>
      <Button
        onPress={addField}
        label='Add signee'
        className='mt-6 '
        type='small'
        iconButton={<Image source={images.plus} className='w-8 h-8' />}
      />
      <View className='mt-6 flex-row gap-x-6'>
        <Button label='Back' onPress={onBack} type='outlined' className='flex-1' />
        <Button label={editable ? 'Save' : 'Preview'} onPress={handleSubmit(onSubmit)} className='flex-1' />
      </View>
    </View>
  )
}