import { supportedOrientations } from '@constants/app.constants';
import { colors } from '@constants/colors.constants';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Control, UseFormSetValue, useWatch } from 'react-hook-form';
import { Modal, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import type { DateData } from 'react-native-calendars';
import { Button } from './Button';
import { Text } from './Text';
import { TextInput } from './TextInput';


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
type Option = { label: string; value: 'custom' | 'last30' | 'last90' | 'last365' | 'ytd' }
const options: Option[] = [
  { label: 'Custom', value: 'custom' },
  { label: 'Last 30 days', value: 'last30' },
  { label: 'Last 90 days', value: 'last90' },
  { label: 'Last 365 days', value: 'last365' },
  { label: 'Year to date', value: 'ytd' },
]
export default function CalendarPicker(props: Props) {
  const { visible, toggleModal, disablePressBackdrop, control, setValue, name } = props
  const [selectedOption, setSelectedOption] = useState<Option>(options[0]);
  const [savedSelectedOption, setSavedSelectedOption] = useState<Option>(options[0]);
  type CalendarMarkedDates = Record<string, { startingDay?: boolean; endingDay?: boolean; color?: string; textColor?: string }>
  const [range, setRange] = useState({ startDate: "", endDate: "" });
  const [markedDates, setMarkedDates] = useState<CalendarMarkedDates>({});

  const date = useWatch({ control, name: 'date' }) || { startDate: "", endDate: "" };
  const savedMarkedDates = useWatch({ control, name: 'markedDates' }) as CalendarMarkedDates | undefined

  const buildMarkedDatesForRange = (startDateStr: string, endDateStr: string): CalendarMarkedDates => {
    if (!startDateStr) return {};
    if (!endDateStr) {
      return {
        [startDateStr]: {
          startingDay: true,
          endingDay: true,
          color: colors.primary,
          textColor: colors.black,
        },
      };
    }

    const start = dayjs(startDateStr);
    const end = dayjs(endDateStr);
    const dates: CalendarMarkedDates = {};

    for (let d = start; d.isBefore(end) || d.isSame(end, 'day'); d = d.add(1, 'day')) {
      const ds = d.format('YYYY-MM-DD');
      dates[ds] = {
        color: colors.teal20,
      };
    }

    dates[startDateStr] = {
      ...(dates[startDateStr] || {}),
      startingDay: true,
      color: colors.primary,
    };
    dates[endDateStr] = {
      ...(dates[endDateStr] || {}),
      endingDay: true,
      color: colors.primary,
    };

    return dates;
  };

  useEffect(() => {
    const today = dayjs();
    let start: string | null = null;
    let end: string | null = null;

    switch (selectedOption.value) {
      case 'last30':
        start = today.subtract(29, 'day').format('YYYY-MM-DD');
        end = today.format('YYYY-MM-DD');
        break;
      case 'last90':
        start = today.subtract(89, 'day').format('YYYY-MM-DD');
        end = today.format('YYYY-MM-DD');
        break;
      case 'last365':
        start = today.subtract(364, 'day').format('YYYY-MM-DD');
        end = today.format('YYYY-MM-DD');
        break;
      case 'ytd':
        start = today.startOf('year').format('YYYY-MM-DD');
        end = today.format('YYYY-MM-DD');
        break;
      case 'custom':
      default:
        return; // do not modify range for custom
    }

    if (start && end) {
      setRange({ startDate: start, endDate: end });
      setMarkedDates(buildMarkedDatesForRange(start, end));
    }
  }, [selectedOption]);

  const handleDayPress = (day: DateData) => {
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
        let dates: CalendarMarkedDates = {};
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
    setSavedSelectedOption(selectedOption)
    toggleModal()
  }

  const onCancel = () => {
    toggleModal()
    setRange(date)
    setTimeout(() => setMarkedDates(savedMarkedDates || {}), 300)
    setTimeout(() => setSelectedOption(savedSelectedOption), 300)
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
                    key={option.value}
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
                  disabled
                  value={range.startDate ? dayjs(range.startDate).format('DD MMM YYYY') : ''}
                  style={{ color: colors.black }}
                  styleLabel={{ color: colors.neutral70 }}
                />
                <TextInput
                  classNameWrap='flex-1'
                  control={control}
                  setValue={setValue}
                  name='toDate'
                  disabled
                  label='To'
                  value={range.endDate ? dayjs(range.endDate).format('DD MMM YYYY') : ''}
                  style={{ color: colors.black }}
                  styleLabel={{ color: colors.neutral70 }}
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