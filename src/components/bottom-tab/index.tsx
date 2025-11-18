import { images } from '@assets/images';
import { Button, Image, Text } from '@components/ui';
import { isAndroid } from '@constants/app.constants';
import { colors } from '@constants/colors.constants';
import { useDeepCompareEffect } from '@hooks/useDeepCompareEffect';
import useKeyboardVisible from '@hooks/useKeyboardVisible';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { StackActions } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ImageSourcePropType, LayoutChangeEvent, LayoutRectangle, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const buttonImages: Record<number, ImageSourcePropType> = {
  0: images.dashboard,
  1: images.incident,
  2: images.setting,

  // 0: images.dashboard,
  // 1: images.job,
  // 2: images.dailyAssessment,
  // 3: images.incident,
  // 4: images.setting,
};

interface Props extends BottomTabBarProps {
}

function MyBottomTab({ state, descriptors, navigation }: Props) {
  const insets = useSafeAreaInsets();
  const selectedValue = useSharedValue<LayoutRectangle | null>(null);

  const [buttonLayout, setButtonLayout] = useState<Record<string, LayoutRectangle>>({});

  const onChangeLayout = useCallback((key: string) => {
    return (e: LayoutChangeEvent) => {
      e.persist();
      if (e.nativeEvent.layout) {
        setButtonLayout((v) => ({ ...v, [key]: e.nativeEvent.layout }));
      }
    };
  }, []);

  const btnSelectedStyled = useAnimatedStyle(() => {
    if (selectedValue.value === null) {
      return {};
    }
    return {
      left: withTiming(selectedValue.value.x),
    };
  }, [selectedValue]);

  useDeepCompareEffect(() => {
    const rect = buttonLayout[state.index];
    if (!rect) {
      return () => { };
    }
    selectedValue.value = rect;
    return () => { };
  }, [state.index, selectedValue, buttonLayout]);

  const visibleKeyboard = useKeyboardVisible()
  if (visibleKeyboard && isAndroid) {
    return <></>
  }

  return (
    <View
      className='flex-row bg-white border-t border-neutral5 justify-evenly pt-3'
      style={{ paddingBottom: insets.bottom }}
    >
      <Animated.View className='absolute top-0 h-[1] w-[65] bg-violet mt-[-1]' style={btnSelectedStyled} />

      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title !== undefined ? options.title : route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          if (state.index === index) {
            return navigation.dispatch(StackActions.popToTop());
          }
          return navigation.navigate(route.name);
        };

        return (
          <Button
            onLayout={onChangeLayout(`${index}`)}
            key={label}
            onPress={onPress}
            className={`items-center `}
          >
            <View className={`${isFocused && 'bg-teal20 rounded-[12px]'}`}>
              <Image
                source={buttonImages[index]}
                className={`w-[32] h-[32] `}
                resizeMode="contain"
                tintColor={colors.neutral80}
              />
            </View>
            <Text
              className={`text-[10px] font-medium text-neutral80 mt-1 `}
              adjustsFontSizeToFit
              numberOfLines={1}
            >
              {label}
            </Text>
          </Button>
        );
      })}
    </View>
  );
}

export default MyBottomTab;
