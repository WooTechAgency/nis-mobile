import { Button, Text, View } from '@components/ui';
import { supportedOrientations } from '@constants/app.constants';
import React from 'react';
import { Modal, TouchableOpacity } from 'react-native';

interface Props {
  visible: boolean;
  toggleModal: () => void;
  title: string;
  titleClassName?: string;
  des?: string;
  desClassName?: string;
  onNegative?: () => void;
  onPositive?: () => void;
  btnNegativeText?: string;
  btnPositiveText?: string;
  wrapperClassName?: string;
  disablePressBackdrop?: boolean;
}
export function CommonModal(props: Props) {
  const {
    visible,
    toggleModal,
    title,
    des,
    onNegative,
    onPositive,
    btnNegativeText,
    btnPositiveText,
    disablePressBackdrop = false,
  } = props;

  const _onClickNegativeBtn = () => {
    toggleModal();
    onNegative && onNegative();
  };

  const _onClickPositiveBtn = () => {
    toggleModal();
    onPositive && onPositive();
  };

  return (
    <Modal visible={visible} animationType='fade' transparent={true} supportedOrientations={supportedOrientations}>
      <View className='px-5 sm:items-center justify-center flex-1 bg-dropBack'>
        {!disablePressBackdrop && (
          <TouchableOpacity className='absolute left-0 right-0 top-0 bottom-0' onPress={toggleModal} />
        )}

        <View className={`bg-white p-6 rounded-[20px] gap-y-6 sm:gap-y-8 sm:min-w-[562px]`}>
          <Text className={`text-[20px] font-semibold text-center`}>{title || 'Notification'}</Text>
          {des && <Text className={`text-center text-primary2`}> {des}</Text>}
          <View className='flex-row items-center justify-center gap-x-4'>
            {btnNegativeText && <Button className='min-w-[134px]' type='outlined' label={btnNegativeText} onPress={_onClickNegativeBtn} />}
            {btnPositiveText && <Button className='min-w-[134px]' label={btnPositiveText} onPress={_onClickPositiveBtn} />}
          </View>
        </View>
      </View>
    </Modal>
  );
}
