import { Button, Text, View } from '@components/ui';
import { supportedOrientations } from '@constants/app.constants';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Modal } from 'react-native';
import { WebView } from 'react-native-webview';


interface Props {
  visible: boolean;
  toggleModal: () => void;
  url: string;
}

export function ShowDocumentModal(props: Props) {
  const {
    visible,
    toggleModal,
    url,
  } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleDocumentLoad = () => {
    setIsLoading(false);
    setError(null);
  };

  const handleDocumentError = (syntheticEvent: any) => {
    const { nativeEvent } = syntheticEvent;
    setIsLoading(false);
    setError(nativeEvent.description || 'Failed to load document');
    Alert.alert('Error', `Failed to load document: ${nativeEvent.description || 'Unknown error'}`);
  };

  const handleClose = () => {
    setIsLoading(false);
    setError(null);
    toggleModal();
  };

  const getFileExtension = (url: string): string => {
    return url.split('.').pop()?.toLowerCase() || '';
  };

  const isSupportedFormat = (url: string): boolean => {
    const extension = getFileExtension(url);
    const supportedFormats = ['pdf', 'doc', 'docx', 'txt', 'rtf', 'html', 'htm'];
    return supportedFormats.includes(extension);
  };

  const getDocumentUrl = (url: string): string => {
    const extension = getFileExtension(url);

    // For PDF files, use Google Docs viewer
    if (extension === 'pdf') {
      return `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(url)}`;
    }

    // For Word documents, use Google Docs viewer
    if (['doc', 'docx'].includes(extension)) {
      return `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(url)}`;
    }

    // For other formats, try to open directly
    return url;
  };

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      animationType='fade'
      transparent={true}
      supportedOrientations={supportedOrientations}
      presentationStyle="fullScreen"
    >
      <View className='flex-1 bg-black'>
        <View className='flex-1'>
          {!isSupportedFormat(url) ? (
            <View className='flex-1 items-center justify-center p-6'>
              <Text className='text-lg font-semibold text-gray-600 mb-2'>
                Unsupported File Format
              </Text>
              <Text className='text-center text-gray-500 mb-4'>
                This file format is not supported for viewing. Supported formats: PDF, DOC, DOCX, TXT, RTF, HTML
              </Text>
              <Text className='text-sm text-gray-400 mb-4'>
                File: {url.split('/').pop()}
              </Text>
            </View>
          ) : (
            <>
              {isLoading && (
                <View className='absolute inset-0 items-center justify-center bg-white bg-opacity-80 z-10'>
                  <ActivityIndicator size="large" color="#3B82F6" />
                  <Text className='mt-4 text-gray-600'>Loading document...</Text>
                </View>
              )}

              {error ? (
                <View className='flex-1 items-center justify-center p-6'>
                  <Text className='text-lg font-semibold text-red-600 mb-2'>
                    Error Loading Document
                  </Text>
                  <Text className='text-center text-gray-500 mb-4'>
                    {error}
                  </Text>
                </View>
              ) : (
                <WebView
                  source={{ uri: getDocumentUrl(url) }}
                  onLoad={handleDocumentLoad}
                  onError={handleDocumentError}
                  style={{ flex: 1 }}
                  startInLoadingState={true}
                  renderLoading={() => (
                    <View className='absolute inset-0 items-center justify-center bg-white'>
                      <ActivityIndicator size="large" color="#3B82F6" />
                      <Text className='mt-4 text-gray-600'>Loading document...</Text>
                    </View>
                  )}
                  allowsInlineMediaPlayback={true}
                  mediaPlaybackRequiresUserAction={false}
                />
              )}
            </>
          )}
        </View>
        <Button label="Close" onPress={handleClose} className='w-[120px] absolute bottom-4 right-4 ' />
      </View>
    </Modal>
  );
}
