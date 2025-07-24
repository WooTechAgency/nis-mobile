import { Button, Text, View } from '@components/ui';
import { supportedOrientations } from '@constants/app.constants';
import React, { ReactNode } from 'react';
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
  btnPositiveDisable?: boolean;
  btnNegativeDisable?: boolean;
  isBtnNegativeWhite?: boolean;
  btnPositiveRightIcon?: ReactNode;
  btnNegativeRightIcon?: ReactNode;
  bottomView?: ReactNode;
  isBtn1Line?: boolean;
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
    titleClassName,
    desClassName,
    wrapperClassName,
    disablePressBackdrop = false,
    btnPositiveDisable = false,
    btnNegativeDisable = false,
    btnPositiveRightIcon,
    btnNegativeRightIcon,
    bottomView,
    isBtn1Line = false,
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

        <View className={`bg-white rounded-lg py-6 px-4 sm:min-w-[488] sm:py-[32px] sm:px-[28px]  ${wrapperClassName}`}>
          <Text className={`text-[21px] font-semibold text-center leading-6 ${titleClassName}`}>{title}</Text>
          {des && <Text className={` text-center mt-2 leading-6 ${desClassName}`}>{des}</Text>}
          {isBtn1Line ? (
            <View className={`mt-[24] flex-row items-center`}>
              {btnNegativeText && (
                <Button
                  label={btnNegativeText}
                  className={`flex-1 ${btnPositiveText && 'mr-2'}`}
                  onPress={_onClickNegativeBtn}
                />
              )}
              {btnPositiveText && (
                <View className={`flex-1 ${isBtn1Line && 'ml-2'}`}>
                  <Button
                    label={btnPositiveText}
                    onPress={_onClickPositiveBtn}
                    disabled={btnPositiveDisable}
                    iconButton={btnPositiveRightIcon}
                  />
                </View>
              )}
            </View>
          ) : (
            <View className=''>
              {btnPositiveText && (
                <Button
                  className='mt-8 sm:mt-6'
                  label={btnPositiveText}
                  onPress={_onClickPositiveBtn}
                  disabled={btnPositiveDisable}
                  iconButton={btnPositiveRightIcon}
                />
              )}
              {btnNegativeText && (
                <Button
                  label={btnNegativeText}
                  className={`mt-3 sm:mt-6`}
                  onPress={_onClickNegativeBtn}
                  iconButton={btnNegativeRightIcon}
                  disabled={btnNegativeDisable}
                />
              )}
            </View>
          )}
          {bottomView && bottomView}
        </View>
      </View>
    </Modal>
  );
}
