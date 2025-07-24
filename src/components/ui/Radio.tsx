// import { View } from 'react-native';
// import React from 'react';
// import { Image } from './Image';
// import { images } from '@src/assets/images';
// import { Text } from './Text';
// import { Button } from './Button';

// interface Props {
//   selected: boolean;
//   label?: string;
//   wrapClassName?: string;
//   toggleRadio: () => void;
// }
// export function Radio({ selected, label, wrapClassName, toggleRadio }: Props) {
//   return (
//     <Button className={`row-center ${wrapClassName}`} onPress={toggleRadio}>
//       <Image source={selected ? images.radioSelected : images.radio2} className='w-6 h-6' />
//       {!!label && <Text>{label}</Text>}
//     </Button>
//   );
// }
