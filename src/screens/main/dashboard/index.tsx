import React, { useEffect, useState } from 'react';
import { View, Text, Button, PermissionsAndroid, Platform, StyleSheet } from 'react-native';
import Voice from '@react-native-voice/voice';
import { SafeAreaView } from '@components/ui';
import Title from '@components/title';
import Header from '@components/header';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import Animated from 'react-native-reanimated';

export default function Dashboard() {
  const [result, setResult] = useState('');
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const onSpeechStart = () => {
    console.log('Speech started');
    setIsListening(true);
  };

  const onSpeechEnd = () => {
    console.log('Speech ended');
    setIsListening(false);
  };

  const onSpeechPartialResults = (e: any) => {
    console.log('onSpeechPartialResults:', e.value);

  };

  const onSpeechResults = (e: any) => {
    console.log('Speech results:', e.value);
    setResult(e.value[0]); // lấy câu đầu tiên
  };

  const startListening = async () => {
    const hasPermission = await requestPermission();
    if (hasPermission) {
      try {
        await Voice.start('en-US'); // đổi thành 'vi-VN' nếu dùng tiếng Việt
      } catch (e) {
        console.error(e);
      }
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };
  const [range, setRange] = useState({ startDate: "", endDate: "" });
  const [markedDates, setMarkedDates] = useState({});

  const handleDayPress = (day) => {
    if (!range.startDate || (range.startDate && range.endDate)) {
      // chọn start date mới
      setRange({ startDate: day.dateString, endDate: "" });
      setMarkedDates({
        [day.dateString]: {
          startingDay: true,
          endingDay: true,
          color: "#4DD0E1", // màu xanh nước
          textColor: "white",
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
            color: "#4DD0E1",
            textColor: "white",
          },
        });
      } else {
        // Tạo range highlight
        let dates = {};
        let current = new Date(startDate);

        while (current <= endDate) {
          let dateStr = current.toISOString().split("T")[0];
          dates[dateStr] = {
            color: "#B2EBF2", // màu nền cho range
            textColor: "black",
          };
          current.setDate(current.getDate() + 1);
        }

        // Đánh dấu start và end
        dates[range.startDate] = {
          startingDay: true,
          color: "#4DD0E1",
          textColor: "white",
        };
        dates[day.dateString] = {
          endingDay: true,
          color: "#4DD0E1",
          textColor: "white",
        };

        setRange({ startDate: range.startDate, endDate: day.dateString });
        setMarkedDates(dates);
      }
    }
  };

  return (
    <SafeAreaView>
      <Header title='Dashboard' />
      <Button title='OK' onPress={startListening} />
      <View className=" w-8 h-8 rounded-full bg-primary mr-2 animate-pulse" />
      <View style={styles.container}>

        <CalendarList
          horizontal
          pagingEnabled
          pastScrollRange={12}
          futureScrollRange={12}
          onDayPress={handleDayPress}
          markingType={"period"}
          markedDates={markedDates}
        />

        <Text style={styles.text}>
          {range.startDate && `From: ${range.startDate}`}{" "}
          {range.endDate && `→ To: ${range.endDate}`}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40 },
  text: { textAlign: "center", marginTop: 20, fontSize: 16 },
});