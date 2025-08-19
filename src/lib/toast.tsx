import { images } from '@assets/images';
import { Image, Text, View } from '@components/ui';
import Toast, { ToastConfigParams } from 'react-native-toast-message';

const parentCls = 'px-2 py-2 pr-4 border flex-row items-center rounded-[6px]'
const titleCls = 'text-base'
const descriptionCls = 'text-[12px] mt-1'
export const toastConfig = {
  success: ({ text1, text2 }: ToastConfigParams<any>) => (
    <View className={`${parentCls} border-positive60 bg-positive10`}>
      <Image source={images.success} className='w-8 h-8' />
      <View className=''>
        <Text className={`${titleCls} text-positive60`}>{text1}</Text>
        {text2 && <Text className='text-[12px] mt-1'>{text2}</Text>}
      </View>
    </View>
  ),
  error: ({ text1, text2 }: ToastConfigParams<any>) => (
    <View className={`${parentCls} border-red bg-red-100`}>
      <Image source={images.error} className='w-[18px] h-[18px]' />
      <View className=''>
        <Text className={`${titleCls} text-[14px] font-regular`}>{text1}</Text>
        {text2 && <Text className={`${descriptionCls}`}>{text2}</Text>}
      </View>
    </View>
  )
}

export const showSuccess = ({ title, message }: { title: string, message?: string }) => {
  Toast.show({ type: 'success', text1: title, text2: message })
}
export const showError = ({ title, message }: { title: string, message?: string }) => {
  Toast.show({ type: 'error', text1: title, text2: message })
}