import { images } from '@assets/images';
import { Button, Image, Text } from '@components/ui';
import dayjs from 'dayjs';
import React, { useRef, useState } from 'react';
import { Control, FieldErrors, UseFormSetValue, useWatch } from 'react-hook-form';
import { View } from 'react-native';
import SignatureScreen, { SignatureViewRef } from 'react-native-signature-canvas';

export const signatureStyle = `
.m-signature-pad--footer {
  display: none;
}
body,html {
  height: 160px;
  background-color: white;;

}

.m-signature-pad {
  margin: 0;
  box-shadow: none; 
  border: 2px dashed #B5B5B5;
  border-radius: 4px;
  

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
  workerName?: string;
  role?: string;
  status?: string
  errors?: FieldErrors;
  control: Control<any, any>;
}

export function Signature({ onBegin, onEnd, control, name, classNameWrap, role, status, workerName, setValue }: Props) {
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
    <View className={`border border-primary  p-4 rounded-[10px] ${classNameWrap}`}>
      <View className='flex-row items-start justify-between'>
        <View>
          <Text className='text-[18px] font-medium'>{workerName || "Worker's name"}</Text>
          <Text className='mt-1'>{role || 'Role'}</Text>
        </View>
        <View className=' items-end'>
          <View className='justify-center items-center h-8 w-[84px] bg-gray rounded-full'>
            <Text className='text-white'>{signatureBase64 ? 'Signed' : 'Pending'}</Text>
          </View>
          {timestamp && <Text className='mt-1'>{dayjs(timestamp).format('HH:mm:ss DD/M/YYYY')}</Text>}
        </View>
      </View>
      {signatureBase64 ? (
        <View className="border-2 border-border mt-4 rounded-[10px] border-dashed" >
          <Image source={{ uri: signatureBase64 }} className="w-full h-[160]" />
          <Button className="absolute right-2 top-2" onPress={onDeleteSignature}>
            <Image source={images.close} className="w-[32] h-[32] " />
          </Button>
        </View>
      ) : (
        <View>
          <SignatureScreen
            style={{ height: 160, marginTop: 16 }}
            ref={refSignature}
            onOK={onSaveEvent}
            webStyle={signatureStyle}
            onEnd={_onEnd}
            onBegin={onBegin}
            bgHeight={160}
          />
          {/* {messageError && <Text className="text-red mt-[6] text-[11px]">{messageError}</Text>} */}
          <View className="mt-4 flex-row items-center gap-x-4">
            <Button
              onPress={onResetSign}
              label="Clear"
              type='outlined'
              className="flex-1"
            />
            <Button
              disabled={!isValidSignature}
              onPress={onSaveSign}
              label="Submit signature"
              className="flex-1 "
            />
          </View>

        </View>
      )}
    </View>
  );
}
