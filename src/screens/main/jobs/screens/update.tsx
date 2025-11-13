import Header from '@components/header';
import { Button, SafeAreaView, ScrollView, Text, View, Wrapper } from '@components/ui';
import { DatePickerInput } from '@components/ui/DatePickerInput';
import Loading from '@components/ui/Loading';
import { TextInput } from '@components/ui/TextInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { showSuccess } from '@lib/toast';
import { goBack } from '@routes/navigationRef';
import { rowClsIncident } from '@screens/main/incidents/config.incident';
import { updateJobApi } from '@services/job.service';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
interface Form {
  awardDate: string;
  expiryDate: string;

}
const formSchema = yup.object().shape({
  assetType: yup.string().required('Asset type is required'),
  whaft: yup.string().required('LRV is required'),
  fleed: yup.string().required('Installation is required'),
  installFormatType: yup.string().required('Date is required'),
  removalFormatType: yup.string().required('Date is required'),
  installRemovalDate: yup.date().required('Date is required'),
  installRemovalTime: yup.date().required('Time is required'),
});

export default function UpdateJob() {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
    },
    mode: 'onSubmit',
    resolver: yupResolver(formSchema),
  });
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: Form) => {
    console.log('data ', data)
    try {
      const payload = {
        ...data
      }
      setLoading(true)
      await updateJobApi(payload)
      showSuccess({ title: 'Job updated successfully!' })
      goBack();
    } catch (e) {
      console.log('error ', e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView className='bg-neutral-100'>
      <ScrollView >
        <Header
          isBack
          leftComponent={
            <View className='flex-row items-center gap-x-4'>
              <Text className='text-[23px] sm:text-[35px] font-medium' numberOfLines={1}>{'CAT 3 Medical'}</Text>
              <View className='bg-red w-[73px] h-[26px] center rounded-full'>
                <Text className='text-[12px] text-white'>Missing</Text>
              </View>
            </View>
          }
        />
        <Wrapper className='gap-6'>
          <TextInput
            classNameWrap='flex-1'
            errors={errors}
            control={control}
            name={`assetType`}
            label='Asset type*'
            placeholder='Enter asset type'
          />
          <View className={`${rowClsIncident} mt-[0px]`}>
            <TextInput
              classNameWrap='flex-1'
              errors={errors}
              control={control}
              name={`whaft`}
              label='Whaft'
              placeholder='Enter whaft'
            />
            <TextInput
              classNameWrap='flex-1'
              errors={errors}
              control={control}
              name={`fleed`}
              label='Fleed/Vessel'
              placeholder='Enter fleed/vessel'
            />
          </View>
          <View className={`${rowClsIncident} mt-[0px]`}>
            <DatePickerInput
              label='Install/Removal Date '
              wrapCls="flex-1"
              setValue={setValue}
              name={`dateOfIncident`}
              control={control}
              mode="date"
              placeholder="dd/mm/yyyy"
              errors={errors}
            />
            <DatePickerInput
              label='Install/Removal Time*'
              wrapCls="flex-1"
              setValue={setValue}
              name={`timeOfIncident`}
              control={control}
              mode='time'
              placeholder="--:--"
              errors={errors}
            />
          </View>
          <TextInput
            classNameWrap='flex-1'
            errors={errors}
            control={control}
            name={`note`}
            label='Note'
            placeholder='Enter note'
            multiline
          />
          <Button
            label='Update'
            className='mt-4'
            onPress={handleSubmit(onSubmit)}
          />
        </Wrapper>
      </ScrollView>
      <Loading loading={loading} />
    </SafeAreaView>

  )
}