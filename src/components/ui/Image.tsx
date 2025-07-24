import React, { useState } from 'react';
import { Image as ImageComponent, ImageProps, TouchableOpacity } from 'react-native';
import TurboImage from 'react-native-turbo-image';
import Loading from './Loading';
import { View } from './View';

interface Props extends ImageProps {
  onPress?: () => void;
  classNameButton?: string;
  isFastImage?: boolean;
  showLoading?: boolean;
}
export function Image(props: Props) {
  const { showLoading, isFastImage } = props;
  const [loading, setLoading] = useState(showLoading || false);

  // if (showLoading) {
  //   return (
  //     <View>
  //       {isFastImage ? (
  //         <TurboImage
  //           onSuccess={() => setLoading(false)}
  //           cachePolicy='urlCache'
  //           resizeMode={'cover'}
  //           className={props.className}
  //           {...props}
  //         />
  //       ) : (
  //         <ImageComponent
  //           source={props?.source?.uri ? { uri: props.source.uri } : images.logo2}
  //           className={props.className}
  //           resizeMode={props.resizeMode || 'cover'}
  //           onLoadEnd={() => setLoading(false)}
  //           {...props}
  //         />
  //       )}
  //       <Loading loading={loading} classNameWrap='rounded-xl' />
  //     </View>
  //   );
  // }

  if (props?.onPress) {
    return (
      <TouchableOpacity onPress={props.onPress} className={`${props?.classNameButton}`} hitSlop={10}>
        <ImageComponent {...props} className={props.className} resizeMode={props.resizeMode || 'contain'} />
      </TouchableOpacity>
    );
  }
  return <ImageComponent {...props} className={props.className} resizeMode={props.resizeMode || 'contain'} />;
}
