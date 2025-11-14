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
        <View className='px-5 sm:items-center justify-center flex-1 bg-dropBack'>
          <View className={`bg-white p-6 rounded-[20px] gap-y-6 sm:gap-y-8 sm:min-w-[562px]`}>
            <Text className={`text-[20px] font-semibold text-center`}>{title || 'Notification'}</Text>
            <Text className={`text-center text-primary1`}>
              {message}
            </Text>
            <Button label={btnText || 'Close'} onPress={this.toggleModal} className='min-w-[134px] sm:min-w-[188] self-center' />
          </View>
        </View>
      </Modal>
    );
  }
}

export default ErrorModal;
