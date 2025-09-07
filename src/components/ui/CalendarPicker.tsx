import { supportedOrientations } from '@constants/app.constants';
import React, { useState } from 'react';
import { Control, UseFormSetValue, set, useWatch } from 'react-hook-form';
import { Modal, TouchableOpacity, View } from 'react-native';
import { Button } from './Button';
import { Text } from './Text';
import { Calendar, CalendarList } from 'react-native-calendars';
import { colors } from '@constants/colors.constants';
import { TextInput } from './TextInput';
import { convertDDMMYYYY, convertUTCDate } from '@utils/date.util';
import dayjs from 'dayjs';


interface Props {
  label?: string;
  wrapCls?: string;
  setValue: UseFormSetValue<any>;
  name: string;
  control: Control<any, any>;
  className?: string;
  classNameText?: string;
  visible: boolean;
  toggleModal: () => void
  disablePressBackdrop?: boolean;
}
const options = [
  { label: 'Custom', value: '' },
  { label: 'Last 30 days', value: '' },
  { label: 'Last 90 days', value: '' },
  { label: 'Last 365 days', value: '' },
  { label: 'Year to date', value: '' },
]
export default function CalendarPicker(props: Props) {
  const { visible, toggleModal, disablePressBackdrop, control, setValue, name } = props
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [range, setRange] = useState({ startDate: "", endDate: "" });
  const [markedDates, setMarkedDates] = useState({});

  const date = useWatch({ control, name: 'date' }) || { startDate: "", endDate: "" };
  const savedMarkedDates = useWatch({ control, name: 'markedDates' })

  const handleDayPress = (day) => {
    if (!range.startDate || (range.startDate && range.endDate)) {
      // chọn start date mới
      setRange({ startDate: day.dateString, endDate: "" });
      setMarkedDates({
        [day.dateString]: {
          startingDay: true,
          endingDay: true,
          color: colors.primary,
          textColor: colors.black,
        },
      });
    } else {
      const startDate = new Date(range.startDate);
      const endDate = new Date(day.dateString);

      if (endDate < startDate) {
        // Nếu endDate nhỏ hơn startDate thì reset lại
        setRange({ startDate: day.dateString, endDate: "" });
        setMarkedDates({
          [day.dateString]: {
            startingDay: true,
            endingDay: true,
            color: colors.primary,
          },
        });
      } else {
        // Tạo range highlight
        let dates = {};
        let current = new Date(startDate);
        while (current <= endDate) {
          let dateStr = current.toISOString().split("T")[0];
          dates[dateStr] = {
            color: colors.teal20
          };
          current.setDate(current.getDate() + 1);
        }
        // Đánh dấu start và end
        dates[range.startDate] = {
          startingDay: true,
          color: colors.primary,
        };
        dates[day.dateString] = {
          endingDay: true,
          color: colors.primary,
        };

        setRange({ startDate: range.startDate, endDate: day.dateString });
        setMarkedDates(dates);
      }
    }
  };

  const onApply = () => {
    setValue(name, range)
    toggleModal()
  }

  const onCancel = () => {
    toggleModal()
    setRange(date)
    setTimeout(() => setMarkedDates(savedMarkedDates), 300)
  }

  return (
    <Modal visible={visible} animationType='fade' transparent={true} supportedOrientations={supportedOrientations}>
      <View className='px-5 sm:items-center justify-center flex-1 bg-dropBack '>
        <View className={`bg-white rounded-[20px] p`}>
          <View className='flex-row gap-x-4 px-6 '>
            <View className='pt-6'>
              {options.map((option) => {
                const isSelected = option.label === selectedOption.label
                return (
                  <Button
                    onPress={() => setSelectedOption(option)}
                    className={`h-[56px] min-w-[148px] justify-center px-4  ${isSelected && 'bg-teal20 rounded-[8px]'}`}
                  >
                    <Text className={` ${!isSelected && 'text-neutral70'}`}>{option.label}</Text>
                  </Button>
                )
              })}
            </View>
            <View className='w-[1px] h-full bg-neutral20 ' />
            <View className=''>
              <View className='row-center items-start gap-x-4 pt-6'>
                <TextInput
                  classNameWrap='flex-1'
                  control={control}
                  setValue={setValue}
                  name='fromDate'
                  label='From'
                  value={range.startDate ? dayjs(range.startDate).format('DD MMM YYYY') : ''}
                />
                <TextInput
                  classNameWrap='flex-1'
                  control={control}
                  setValue={setValue}
                  name='toDate'
                  label='To'
                  value={range.endDate ? dayjs(range.endDate).format('DD MMM YYYY') : ''}
                />
              </View>
              <Calendar
                style={{
                  width: 466,
                  paddingBottom: 24
                }}
                firstDay={1}
                onDayPress={handleDayPress}
                markingType={"period"}
                markedDates={markedDates}
              />
            </View>
          </View>
          <View className='min-w-[562px] h-[1px] bg-neutral20' />
          <View className='row-center gap-x-4 self-end px-6 py-4'>
            <Button
              label='Cancel'
              type='outlined'
              className='w-[179px]'
              onPress={onCancel}
            />
            <Button
              label='Apply'
              className='w-[179px]'
              onPress={onApply}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}