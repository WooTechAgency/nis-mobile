import { images } from '@assets/images';
import Title from '@components/title';
import { Button, Image } from '@components/ui';
import { yupResolver } from '@hookform/resolvers/yup';
import { navigate } from '@routes/navigationRef';
import { RouteName } from '@routes/types';
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Keyboard, View } from 'react-native';
import * as yup from 'yup';
import { IncidentSteps, useIncidentContext } from '../../context';
import { SigneeItem } from '../components/SigneeItem';

export interface SigneeForm {
  name?: string;
  role?: any; //TODO: chua biet
  signature?: string;
  timestamp?: Date;
}

interface Form {
  signees: SigneeForm[];
}

const signeeDefault = {
  name: '',
  role: '',
  signature: '',
  timestamp: new Date(),
}

const formSchema = yup.object().shape(
  {
    signees: yup
      .array()
      .notRequired()
      .of(
        yup.object({
          name: yup.string().notRequired(),
          role: yup.mixed().notRequired(),
          signature: yup.string().notRequired(),
          timestamp: yup.date().notRequired()
        })
      ),
  },
);

export default function StepSignOff() {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, },
  } = useForm({
    defaultValues: {
      signees: [signeeDefault],
    },
    mode: 'onChange',
    resolver: yupResolver(formSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'signees',
  });

  const { setIncident } = useIncidentContext()

  const onSubmit = (form: Form) => {
    console.log('form', form)
    setIncident((prev) => ({ ...prev, selectedIndex: IncidentSteps.SignOff, singing: form.signees }))
    navigate(RouteName.PreviewIncident)
  }

  const onBack = () => {
    setIncident((prev) => ({ ...prev, selectedIndex: IncidentSteps.Witness }))
  }

  const addField = () => {
    Keyboard.dismiss()
    append({ ...signeeDefault, timestamp: new Date() });
  };

  return (
    <View className=' mt-6'>
      <Title label='Sign off' />
      {fields.map((item, index) => {
        return (
          <View key={item.id} style={{ zIndex: 50 - index }}>
            <SigneeItem
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
        label='Add signee'
        className='mt-6 '
        type='small'
        iconButton={<Image source={images.plus} className='w-8 h-8' />}
      />
      <View className='mt-6 flex-row gap-x-6'>
        <Button label='Back' onPress={onBack} type='outlined' className='flex-1' />
        <Button label='Preview' onPress={handleSubmit(onSubmit)} className='flex-1' />
      </View>
    </View>
  )
}