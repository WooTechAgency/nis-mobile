import { ActivityIndicator, FlatList as FlatListComponent, FlatListProps, RefreshControl } from 'react-native';
import React, { ReactNode } from 'react';
import { useQueryClient } from '@tanstack/react-query';
// import Empty from '../empty/NotificationEmpty';

interface Props extends FlatListProps<any> {
  queryKey?: string;
  isFetching?: boolean;
  isLoading?: boolean;
  skeletonFlatList?: ReactNode;
  emptyComponent?: ReactNode;
  classNameEmptyWrap?: string;
}

export function FlatList(props: Props) {
  const {
    queryKey,
    children,
    isLoading,
    skeletonFlatList,
    onEndReached,
    emptyComponent,
    horizontal,
    classNameEmptyWrap,
    isFetching,
  } = props;
  const queryClient = useQueryClient();

  const onRefresh = () => {
    if (queryKey) {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    }
  };
  if (isLoading) {
    return skeletonFlatList;
  }

  // if (props.data?.length === 0) {
  //   return emptyComponent || <Empty classNameWrap={classNameEmptyWrap} />;
  // }

  return (
    <FlatListComponent
      {...props}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      onEndReachedThreshold={onEndReached ? 0.5 : undefined}
      refreshControl={!horizontal && queryKey ? <RefreshControl refreshing={false} onRefresh={onRefresh} /> : undefined}
      ListFooterComponent={() => isFetching && <ActivityIndicator className='my-4' />}
    >
      {children}
    </FlatListComponent>
  );
}
