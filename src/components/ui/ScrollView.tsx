import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { RefreshControl } from 'react-native';
import { KeyboardAwareScrollView, KeyboardAwareScrollViewProps } from 'react-native-keyboard-controller';

interface Props extends KeyboardAwareScrollViewProps {
  isContentCenter?: boolean;
  hasRef?: (ref: any) => void;

  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  isFetching?: boolean;
  onRefreshCallback?: () => void;
  queryKey?: string;
}
export function ScrollView(props: Props) {
  const { fetchNextPage, hasNextPage, isFetching, onRefreshCallback, queryKey, ...restProps } = props;
  const queryClient = useQueryClient();


  const onRefresh = () => {
    if (onRefreshCallback) {
      return onRefreshCallback();
    }
    if (queryKey) {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    }
  };

  const handleScroll = (event: any) => {
    const { nativeEvent } = event;
    const isCloseToBottom = (layoutMeasurement: any, contentOffset: any, contentSize: any) => {
      const paddingToBottom = 20; // Distance from the bottom
      return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
    };

    if (
      isCloseToBottom(nativeEvent.layoutMeasurement, nativeEvent.contentOffset, nativeEvent.contentSize) &&
      fetchNextPage &&
      hasNextPage &&
      !isFetching
    ) {
      fetchNextPage();
    }

    // Call original onScroll if provided
    if (props.onScroll) {
      props.onScroll(event);
    }
  };


  return (
    <KeyboardAwareScrollView
      ref={props.hasRef}
      keyboardShouldPersistTaps='handled'
      className={`flex-1 ${props.className}`}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[props.isContentCenter && { flexGrow: 1, alignItems: 'center' }]}
      onScroll={handleScroll}
      scrollEventThrottle={400}
      refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh} />}
      {...restProps}
    >
      {props.children}
    </KeyboardAwareScrollView>
  );
}
