import { Button, FlatList, Text } from '@components/ui';
import { getMessageError } from '@utils/common';
import React from 'react';
import { Control, FieldErrors, UseFormSetValue, useWatch } from 'react-hook-form';
import { View } from 'react-native';


interface Props {
  setValue: UseFormSetValue<any>;
  name: string;
  control: Control<any, any>;
  labelCls?: string;
  label?: string;
  classNameWrap?: string;
  errors?: FieldErrors;
  listValue?: any[];
}

const options = [
  { key: 'h1', title: 'H1', bg: '#EAECF0', color: 'black' },
  { key: 'h2', title: 'H2', bg: '#C7CAD0', color: 'black' },
  { key: 'h3', title: 'H3', bg: '#667085', color: 'white' },
  { key: 'h4', title: 'H4', bg: '#667085', color: 'white' },
  { key: 'h5', title: 'H5', bg: '#667085', color: 'white' },
  { key: 'h6', title: 'H6', bg: '#667085', color: 'white' },
  { key: 'h7', title: 'H7', bg: '#667085', color: 'white' },
  { key: 'h8', title: 'H8', bg: '#667085', color: 'white' },
  { key: 'h9', title: 'H9', bg: '#667085', color: 'white' },
  { key: 'h10', title: 'H10', bg: '#667085', color: 'white' },
];
const COL = 5

export function SelectRating(props: Props) {
  const { setValue, name, control, label, labelCls, listValue, classNameWrap, errors } = props;
  const value = useWatch({
    name,
    control,
  });

  const messageError = getMessageError(errors, name);

  const onSelect = (option: any) => {
    setValue(name, option.key);
  };

  return (
    <View className={` ${classNameWrap}`}>
      {label && <Text className={`text-[12px] px-1 mb-2 ${labelCls}`}>{label}</Text>}
      <FlatList
        data={options}
        scrollEnabled={false}
        keyExtractor={(item) => item.key}
        numColumns={COL}
        columnWrapperStyle={{ marginTop: 8 }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          const isLastInRow = (index + 1) % COL === 0;

          return (
            <Button
              onPress={() => onSelect(item)}
              style={{ backgroundColor: item.bg }}
              className={`grow h-[48px] rounded-full justify-center items-center mr-2 ${isLastInRow && 'mr-0'} ${value === item.key && 'border border-red'}`}
            >
              <Text className='font-medium' style={{ color: item.color }}>{item.title}</Text>
            </Button>
          )
        }}
      />
    </View>
  );
}