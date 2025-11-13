import { Text, View } from '@components/ui';

export function ValueItem({ label, value, classNameWrap }: { label: string, value?: string, classNameWrap?: string }) {
  return (
    <View className={`gap-y-1 ${classNameWrap}`}>
      <Text className='text-[12px] text-neutral40'>{label}</Text>
      {value && <Text className='text-[16px] mt-1'>{value}</Text>}
    </View>
  )
}