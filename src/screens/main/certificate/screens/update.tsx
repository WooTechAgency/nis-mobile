import Header from '@components/header';
import { Button, SafeAreaView, ScrollView, Text, View, Wrapper } from '@components/ui';
import { DatePickerInput } from '@components/ui/DatePickerInput';
import { DocumentForm } from '@components/ui/DocumentForm';
import Loading from '@components/ui/Loading';
import { yupResolver } from '@hookform/resolvers/yup';
import { showSuccess } from '@lib/toast';
import { goBack } from '@routes/navigationRef';
import { updateCertificateApi } from '@services/certificate.service';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
interface Form {
  awardDate: string;
  expiryDate: string;

}
const formSchema = yup.object().shape({
  awardDate: yup.date().required('Award date is required'),
  expiryDate: yup.date().required('Expiry date is required'),
  documents: yup.object().required('Document is required'),

});

export default function UpdateCertificate() {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      awardDate: new Date(),
      expiryDate: new Date(),
    },
    mode: 'onSubmit',
    resolver: yupResolver(formSchema),
  });
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: Form) => {
    try {
      const payload = {
        ...data
      }
      setLoading(true)
      await updateCertificateApi(payload)
      showSuccess({ title: 'Certificate updated successfully!' })
      goBack();
    } catch (e) {
      console.log('error ', e)
    }
    finally {
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
        <Wrapper>
          <DatePickerInput
            label='Award date'
            wrapCls="mt-6"
            setValue={setValue}
            name={`awardDate`}
            control={control}
            mode="date"
            placeholder="Date"
            errors={errors}
          />
          <DatePickerInput
            label='Expiry date'
            wrapCls="mt-6"
            setValue={setValue}
            name={`expiryDate`}
            control={control}
            mode="date"
            placeholder="Date"
            errors={errors}
          />
          <DocumentForm
            name={`.documents`}
            setValue={setValue}
            control={control}
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