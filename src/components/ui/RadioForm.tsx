// import { View } from 'react-native';
// import React, { ReactNode } from 'react';
// import { Image, Button, Text } from '@src/components/ui';
// import { Control, FieldErrors, UseFormSetValue, useWatch } from 'react-hook-form';
// import { getMessageError } from '@src/utils';
// import { useToggle } from '@src/hooks/useToggle';
// import { images } from '@src/assets/images';

// interface Props {
//   setValue: UseFormSetValue<any>;
//   name: string;
//   control: Control<any, any>;
//   labelCls?: string;
//   label?: string;
//   classNameWrap?: string;
//   errors?: FieldErrors;
//   listValue?: any[];
//   isYesNo?: boolean;
// }

// export default function RadioForm(props: Props) {
//   const { setValue, name, control, label, isYesNo = false, listValue, classNameWrap, errors } = props;
//   const value = useWatch({
//     name,
//     control,
//   });

//   const messageError = getMessageError(errors, name);

//   const onYes = () => {
//     setValue(name, true, { shouldDirty: true });
//   };

//   const onNo = () => {
//     setValue(name, false, { shouldDirty: true });
//   };

//   const onSelect = (item) => {
//     setValue(name, item);
//   };

//   return (
//     <View className={`${classNameWrap}`}>
//       <View className=' justify-center'>
//         <Text className='text-[12px] text-grey700'>{label}</Text>
//       </View>
//       <View className='mt-3 flex-row items-center'>
//         {isYesNo ? (
//           <>
//             <Button className='flex-row items-center' onPress={onYes}>
//               <Image
//                 source={value === true ? images.radioActive : images.radio}
//                 className='w-5 h-5'
//                 tintColor={value === true ? '#002D72' : undefined}
//               />
//               <Text className='ml-2'>Yes</Text>
//             </Button>
//             <Button className='flex-row items-center ml-4' onPress={onNo}>
//               <Image
//                 source={value === false ? images.radioActive : images.radio}
//                 className='w-5 h-5'
//                 tintColor={value === false ? '#002D72' : undefined}
//               />
//               <Text className='ml-2'>No</Text>
//             </Button>
//           </>
//         ) : (
//           <View className=''>
//             {listValue?.map((item, index) => (
//               <Button
//                 className={`flex-row items-center mt-4 ${index === 0 && 'mt-0'}`}
//                 onPress={() => onSelect(item)}
//                 key={item.id}
//               >
//                 <Image
//                   source={value?.id === item?.id ? images.radioActive : images.radio}
//                   className='w-5 h-5'
//                   tintColor={value?.id === item?.id ? '#002D72' : undefined}
//                 />
//                 <Text className='ml-2'>{item.name}</Text>
//               </Button>
//             ))}
//           </View>
//         )}
//       </View>
//     </View>
//   );
// }
