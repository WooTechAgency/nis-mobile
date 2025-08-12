import { Button, Text } from '@components/ui';
import { supportedOrientations } from '@constants/app.constants';
import React, { Component } from 'react';
import { Modal, View } from 'react-native';

interface ErrorModalState {
  visible?: boolean;
  title?: string;
  message?: string;
  btnText?: string;
}

class ErrorModal extends Component<{}, ErrorModalState> {
  static errorModalInstance: ErrorModal;

  constructor(props: ErrorModalState) {
    super(props);
    this.state = {
      visible: false,
      title: 'Notification',
      message: '',
      btnText: 'Close',
    };
    ErrorModal.errorModalInstance = this;
  }

  static show({ title, message, btnText }: ErrorModalState) {
    ErrorModal.errorModalInstance._show({
      title,
      message,
      btnText,
    });
  }

  _show({ title, message, btnText }) {
    this.setState({
      visible: true,
      title,
      message,
      btnText,
    });
  }

  toggleModal = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible, title, message, btnText } = this.state;
    return (
      <Modal visible={visible} animationType='fade' transparent={true} supportedOrientations={supportedOrientations}>
        <View className='flex-1 sm:items-center justify-center bg-dropBack '>
          <View className={`bg-white p-6 px-12 rounded-[20px] `}>
            <Text className={`text-[20px] font-semibold text-center`}>{title || 'Notification'}</Text>
            <Text className={`text-center text-primary1 mt-6`}>
              {message}
            </Text>
            <Button label={btnText || 'Close'} onPress={this.toggleModal} className='mt-6' />
          </View>
        </View>
      </Modal>
    );
  }
}

export default ErrorModal;
