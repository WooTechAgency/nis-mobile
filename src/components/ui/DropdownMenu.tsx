import React from 'react';
import { Control, UseFormSetValue, useWatch } from 'react-hook-form';
import Popover, { PopoverPlacement } from 'react-native-popover-view';
import { PublicPopoverProps } from 'react-native-popover-view/dist/Popover';
import { Button } from './Button';
import { Text } from './Text';
import { View } from './View';
import { IDropdown } from '@constants/interface';

interface Props extends PublicPopoverProps {
  visible: boolean;
  toggleVisible: () => void;
  radius?: number;
  setValue: UseFormSetValue<any>;
  listValue: IDropdown[] | undefined;
  name: string
  control: Control<any, any>
}
export default function DropdownMenu(props: Props) {
  const { visible, toggleVisible, children, radius = 12, setValue, listValue, name, control } = props;
  const selectedValue = useWatch({ control, name })

  const onSelect = (item: IDropdown) => {
    setValue(name, item, { shouldValidate: true })
  }

  return (
    <Popover
      isVisible={visible}
      onRequestClose={toggleVisible}
      offset={4}
      placement={PopoverPlacement.AUTO}
      from={children}
      arrowSize={{ width: -1, height: -1 }}
      backgroundStyle={{ backgroundColor: 'rgba(0,0,0,0.1)' }}

      {...props}
      popoverStyle={[{ borderRadius: radius }, props.popoverStyle]}
    >
      <View className='bg-white rounded-[8px] py-2  w-[250px]'>
        {listValue?.map(((item, index) =>
          <Button
            key={index}
            className={`py-2 border-b border-neutral30 px-4 ${index === listValue.length - 1 && 'border-b-0'}`}
            onPress={() => {
              toggleVisible()
              onSelect(item)
            }}
          >
            <Text className={`${selectedValue?.value === item.value && 'font-semibold'}`} >{item.label}</Text>
          </Button>
        ))}
      </View>
    </Popover>
  );
}
