import { images } from '@assets/images';
import { Button, Image, SafeAreaView } from '@components/ui';
import { colors } from '@constants/colors.constants';
import { useAppSelector } from '@hooks/common';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { StackActions } from '@react-navigation/native';
import { RouteName } from '@routes/types';
import { getCurrentUserApi } from '@services/authentication.service';
import { useGetCurrentUser } from '@services/hooks/useGetCurrentUser';
import { toggleCollapseDrawer } from '@store/slices/commonSlice';
import React, { useEffect, useMemo } from 'react';
import { Keyboard, View } from 'react-native';
import Animated, { Easing, ReduceMotion, SharedValue, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useDispatch } from 'react-redux';

interface Props {
  title?: string;
  url: any;
  onPress: () => void;
  selected?: boolean;
  collapsedDrawer: boolean;
  opacity?: SharedValue<number>;
  rotate?: SharedValue<string>;
  isCloseButton?: boolean
}

function Item({
  title,
  url,
  onPress,
  selected,
  collapsedDrawer,
  opacity,
  rotate,
  isCloseButton = false
}: Props) {
  const arrowRotateStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: rotate?.value ?? '0deg' }],
    };
  });
  return (
    <Button
      style={{ overflow: 'visible' }}
      className={`flex-row items-center h-[56] px-[12]   
       ${selected && 'bg-teal20 rounded-[20px] '}
       ${collapsedDrawer && 'w-[56]'}
       `}
      onPress={() => {
        Keyboard.dismiss()
        onPress()
      }}
    >
      {isCloseButton
        ? <Animated.Image
          source={images.arrowLeft3}
          className='w-6 h-6 ml-1'
          resizeMode={'contain'}
          style={arrowRotateStyle}
        />
        :
        <View className='w-8 h-8 justify-center items-center'>
          <Image
            source={url}
            className='w-full h-full'
            tintColor={selected ? 'black' : colors.neutral70}
          />
        </View>
      }
      {title &&
        <Animated.Text
          style={[
            {
              opacity,
              position: 'absolute',
              left: 52,
              fontFamily: 'Poppins-Regular',
              color: selected ? colors.black : colors.neutral70,
              fontSize: 16
            },
          ]}
        >
          {title}
        </Animated.Text>
      }
    </Button>
  );
}

interface DrawerProps extends DrawerContentComponentProps {
  collapsedDrawer: boolean;
}

export default function Drawer({ navigation, state, collapsedDrawer, }: DrawerProps) {
  const dispatch = useDispatch();
  const { userInfo } = useAppSelector((state) => state.authentication)
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



  const { data: currentUser = userInfo } = useGetCurrentUser()

  const menuItems = useMemo(() => {
    const items = [
      { title: 'Dashboard', url: images.dashboard, routeIndex: 0 },
      { title: 'Jobs', url: images.job, routeIndex: 1 },
      { title: 'Daily assessment', url: images.dailyAssessment, routeIndex: 2 },
      { title: 'Incidents', url: images.incident, routeIndex: 3 },
    ]
    if (currentUser) {
      const viewIncidentReportsPermission = currentUser?.role?.permissions?.incident_reports?.find((permission) => permission.action === 'view')
      const viewDailyAssessmentPermission = currentUser?.role?.permissions?.DSRA?.find((permission) => permission.action === 'view')
      if (!viewIncidentReportsPermission) {
        const incidentReportsIndex = items.findIndex((item) => item.title === 'Incidents')
        items.splice(incidentReportsIndex, 1)
      }
      if (!viewDailyAssessmentPermission) {
        const dailyAssessmentIndex = items.findIndex((item) => item.title === 'Daily assessment')
        items.splice(dailyAssessmentIndex, 1)
      }
    }
    return items
  }, [currentUser]);

  return (
    <Animated.View className='flex-1 ' style={{ width }}>
      <SafeAreaView className={`pl-8 pr-4 bg-white ${collapsedDrawer && 'pl-4'}`}>
        <View className='mt-4 pb-8 flex-col h-full  '>
          <Button onPress={onClickLogo} className=' '>
            <View className='flex-row  '>
              <Animated.Image
                style={{ width: 53, height: 31 }}
                source={images.logo}
                resizeMode={'contain'}
              />
            </View>
          </Button>
          <View className='flex-col justify-between flex-1 mt-6'>
            <View>
              {menuItems.map((item, idx) => (
                <Item
                  key={idx}
                  title={item.title}
                  url={item.url}
                  onPress={() => onPress(item.routeIndex)}
                  selected={state.index === item.routeIndex}
                  collapsedDrawer={collapsedDrawer}
                  opacity={opacity}
                />
              ))}
            </View>
            <View>
              <Item
                title={'Account'}
                url={images.setting}
                onPress={() => onPress(4)}
                selected={state.index === 4}
                collapsedDrawer={collapsedDrawer}
                opacity={opacity}
              />
              <Item
                url={''}
                onPress={() => dispatch(toggleCollapseDrawer())}
                selected={false}
                collapsedDrawer={collapsedDrawer}
                opacity={opacity}
                rotate={rotate}
                isCloseButton
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Animated.View>
  );
}
