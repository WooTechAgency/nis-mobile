import { images } from '@assets/images';
import { Button, Image, Text } from '@components/ui';
import { convertHHMMSSDDMMYYYY } from '@utils/date.util';
import React, { useRef, useState } from 'react';
import { Control, FieldErrors, UseFormSetValue, useWatch } from 'react-hook-form';
import { View } from 'react-native';
import SignatureScreen, { SignatureViewRef } from 'react-native-signature-canvas';

export const signatureStyle = `
.m-signature-pad--footer {
  display: none;
}
body,html {
  height: 144px;
  background-color: white;;
}
.m-signature-pad {
  margin: 0;
  box-shadow: none; 
  border: 1px solid #BEBEBE;
  border-radius: 14px;
}
.m-signature-pad--body {
  position: absolute;
  top: 1px;
  left: 1px;
  right: 1px;
  border: none;
  box-shadow: none; 
  background: transparent;
}
`;

interface Props {
  classNameWrap?: string;
  onBegin?: () => void;
  onEnd?: () => void;
  setValue: UseFormSetValue<any>;
  name?: string;
  errors?: FieldErrors;
  control: Control<any, any>;
}

export function Signature({ onBegin, onEnd, control, name, classNameWrap, setValue }: Props) {
  const refSignature = useRef<SignatureViewRef>(null);
  const [isValidSignature, setIsValidSignature] = useState(false);
  const signatureBase64 = useWatch({ name: `${name}.signature`, control })
  const timestamp = useWatch({ name: `${name}.timestamp`, control })
  // const messageError = getMessageError(errors, name);

  const onSaveSign = () => {
    refSignature?.current?.readSignature();
    setIsValidSignature(false);
  };

  const onResetSign = () => {
    refSignature?.current?.clearSignature();
    setIsValidSignature(false);
  };

  const _onEnd = () => {
    if (onEnd) {
      onEnd();
    }
    setIsValidSignature(true);
  };

  const onSaveEvent = (signature: string) => {
    setValue(`${name}.signature`, signature, { shouldValidate: true, shouldDirty: true });
    setValue(`${name}.timestamp`, new Date());
  }

  const onDeleteSignature = () => {
    setValue(`${name}.signature`, '', { shouldValidate: true, shouldDirty: true });
    setValue(`${name}.timestamp`, '');
  }

  return (
    <View className={` ${classNameWrap}`}>
      {signatureBase64 ? (
        <View className="border border-border  rounded-[10px] " >
          <Text className='absolute left-4 -top-2 bg-white z-10 text-[12px] text-neutral70 '>Add signature</Text>
          <Image source={{ uri: signatureBase64 }} className="w-full h-[144]" />
          <Button className="absolute right-2 top-2" onPress={onDeleteSignature}>
            <Image source={images.close} className="w-[32] h-[32] " />
          </Button>
          <Text className='text-neutral70 text-[12px] absolute right-4 bottom-4 '>{convertHHMMSSDDMMYYYY(timestamp)}</Text>
        </View>
      ) : (
        <>
          <Text className='absolute left-4 -top-2 bg-white z-10 text-[12px] text-neutral70 '>Add signature</Text>
          <SignatureScreen
            style={{ height: 144 }}
            ref={refSignature}
            onOK={onSaveEvent}
            webStyle={signatureStyle}
            onEnd={_onEnd}
            onBegin={onBegin}
            bgHeight={144}
          />
          <View className="mt-4 flex-row items-center gap-x-4">
            <Button
              onPress={onResetSign}
              label="Clear"
              type='small'
              className=' w-[135px] bg-white border-primary border'
            />
            <Button
              disabled={!isValidSignature}
              onPress={onSaveSign}
              type='small'
              label="Submit signature"
              className=' bg-teal20'
            />
          </View>
        </>
      )}
    </View>
  );
}
