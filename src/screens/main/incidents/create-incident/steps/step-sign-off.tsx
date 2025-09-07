import { images } from '@assets/images';
import Title from '@components/title';
import { Button, Image } from '@components/ui';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppSelector } from '@hooks/common';
import { IRole } from '@services/role.service';
import { formatRole } from '@utils/functions.util';
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Keyboard, View } from 'react-native';
import * as yup from 'yup';
import { IncidentSteps, useIncidentContext } from '../../context';
import { SigneeItem } from '../components/singee-item';
import { navigate } from '@routes/navigationRef';
import { RouteName } from '@routes/types';
import { useUpsertIncident } from '../../useUpsertIncident';

export interface SignOffForm {
  signees: Signee[];
}

export interface Signee {
  name: string;
  role: IRole;
  signature?: string;
  timestamp?: Date;
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
          name: yup.string().required('Name is required'),
          role: yup.object().required('Role is required'),
          signature: yup.string().required('Signature is required'),
          timestamp: yup.date().notRequired()
        })
      ),
  },
);

export default function StepSignOff({ editingMode }: { editingMode: boolean }) {
  const { upsertIncident } = useUpsertIncident()

  const { userInfo } = useAppSelector((state) => state.authentication)
  const { setIncident, incident: { singing } } = useIncidentContext()

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, },
    trigger
  } = useForm({
    defaultValues: {
      signees: singing?.signees || [
        { ...signeeDefault, name: userInfo?.full_name, role: formatRole(userInfo?.role) }
      ],
    },
    mode: 'onSubmit',
    resolver: yupResolver(formSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'signees',
  });


  const onSubmit = (form: SignOffForm) => {
    setIncident((prev) => ({ ...prev, selectedIndex: IncidentSteps.SignOff, singing: form }))
    navigate(RouteName.PreviewIncident)
    upsertIncident({ singing: form })
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
              name={`signees.${index}`}
              trigger={trigger}
              remove={remove}
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