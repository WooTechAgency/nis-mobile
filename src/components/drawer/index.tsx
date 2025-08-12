import { images } from '@assets/images';
import { isIpad } from '@constants/app.constants';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { StackActions } from '@react-navigation/native';
import { toggleCollapseDrawer } from '@store/slices/commonSlice';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { Easing, ReduceMotion, SharedValue, useSharedValue, withTiming } from 'react-native-reanimated';
import { useDispatch } from 'react-redux';
import { Button, Image, SafeAreaView, Text } from '@components/ui';
import { RouteName } from '@routes/types';
import { colors } from '@constants/colors.constants';

interface Props {
  title: string;
  url: any;
  onPress: () => void;
  index: number;
  selectedIndex?: boolean;
  collapsedDrawer: boolean;
  opacity?: SharedValue<number>;
  rotate?: SharedValue<string>;
}

function Item({
  title,
  url,
  onPress,
  index,
  selectedIndex,
  collapsedDrawer,
  opacity,
  rotate,
}: Props) {
  return (
    <Button
      style={{ overflow: 'visible' }}
      className={`flex-row items-center h-[56] px-[12]
       ${selectedIndex && 'bg-teal20 rounded-[20px]'}
       ${collapsedDrawer && 'w-[56]'
        }`}
      onPress={onPress}
    >
      <View className='w-8 h-8 justify-center items-center'>
        {/* animation for open and close sidebar */}
        {index === 5 ? (
          <View className='w-8 h-8  rounded-full border border-neutral20 justify-center items-center'>
            <Animated.Image
              source={images.arrowLeft2}
              tintColor={'black'}
              style={{ width: 12, height: 8, transform: [{ rotate }] }}
              resizeMode={'contain'}
            />
          </View>
        ) : (
          <Image
            source={url}
            className='w-full h-full'
            tintColor={selectedIndex ? 'black' : colors.neutral70}
          />
        )}
      </View>
      {isIpad ? (
        <Animated.Text
          style={[
            {
              opacity,
              position: 'absolute',
              left: 52,
              fontFamily: 'Poppins-Regular',
              color: selectedIndex ? colors.black : colors.neutral70,
              fontSize: 16
            },
          ]}
        >
          {title}
        </Animated.Text>
      ) : (
        <Text
          className={`text-neutral70 ml-2 ${selectedIndex && 'text-black'} ${collapsedDrawer && 'hidden'}`}
        >
          {title}
        </Text>
      )}
    </Button>
  );
}

interface DrawerProps extends DrawerContentComponentProps {
  collapsedDrawer: boolean;
}

export default function Drawer({ navigation, state, collapsedDrawer, }: DrawerProps) {
  const dispatch = useDispatch();

  const onPress = (index: number) => {
    if (state.index === index) {
      return navigation.dispatch(StackActions.popToTop());
    }
    navigation.navigate(state.routes[index].name);
  };

  const onClickLogo = () => {
    navigation.dispatch(StackActions.popToTop());
    navigation.navigate(RouteName.DashboardNavigator);
  };

  const width = useSharedValue(264);
  const opacity = useSharedValue(1);
  const rotate = useSharedValue('0deg');

  useEffect(() => {
    if (collapsedDrawer) {
      width.value = withTiming(96, { duration: 300, easing: Easing.linear, reduceMotion: ReduceMotion.System });
      opacity.value = withTiming(0, { duration: 300 });
      rotate.value = withTiming('-180deg', { duration: 400 });
    } else {
      width.value = withTiming(264, { duration: 300, easing: Easing.linear, reduceMotion: ReduceMotion.System });
      opacity.value = withTiming(1, { duration: 300 });
      rotate.value = withTiming('0deg', { duration: 400 });
    }
  }, [collapsedDrawer]);

  return (
    <Animated.View className='flex-1 ' style={{ width }}>
      <SafeAreaView className={`pl-8 pr-4 bg-white ${collapsedDrawer && 'pl-4'}`}>
        <View className='mt-4 pb-8 flex-col h-full  '>
          <Button onPress={onClickLogo} className=' '>
            <View className='flex-row  items-center ml-[12]'>
              <Animated.Image
                style={{ opacity, width: 130, height: 45, marginLeft: -6 }}
                source={images.logo}
                resizeMode={'contain'}
              />
            </View>
          </Button>
          <View className='flex-col justify-between flex-1'>
            <View className='mt-6'>
              <Item
                title={'Dashboard'}
                url={images.dashboard}
                onPress={() => onPress(0)}
                index={0}
                selectedIndex={state.index === 0}
                collapsedDrawer={collapsedDrawer}
                opacity={opacity}
              />
              <Item
                title={'Job'}
                url={images.dashboard}
                onPress={() => onPress(1)}
                index={1}
                selectedIndex={state.index === 1}
                collapsedDrawer={collapsedDrawer}
                opacity={opacity}
              />
              <Item
                title={'Daily assessment'}
                url={images.dailyAssessment}
                onPress={() => onPress(2)}
                index={1}
                selectedIndex={state.index === 2}
                collapsedDrawer={collapsedDrawer}
                opacity={opacity}
              />
              <Item
                title={'Incidents'}
                url={images.incident}
                onPress={() => onPress(3)}
                index={3}
                selectedIndex={state.index === 3}
                collapsedDrawer={collapsedDrawer}
                opacity={opacity}
              />
            </View>
            <View>
              <Item
                title={'Account'}
                url={images.setting}
                onPress={() => onPress(4)}
                index={4}
                selectedIndex={state.index === 4}
                collapsedDrawer={collapsedDrawer}
                opacity={opacity}
              />
              <Item
                title={'Close'}
                onPress={() => dispatch(toggleCollapseDrawer())}
                index={5}
                selectedIndex={false}
                collapsedDrawer={collapsedDrawer}
                opacity={opacity}
                rotate={rotate}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Animated.View>
  );
}
