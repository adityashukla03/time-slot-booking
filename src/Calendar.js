import React, { useState } from 'react';
import {Alert, StyleSheet, Text, TextInput, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Button from './components/Button';

const calendar = () => {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEnd, setIsOpenEnd] = useState(false);
  const [selectedSlotsArray, setSelectedSlotsArray] = useState([]);

  const setSTime = date => {
    setIsOpen(false);
    setStartTime(date);
  };
  const setETime = date => {
    setIsOpenEnd(false);
    if (!startTime) {
      Alert.alert('Please select start time first');
      return;
    }
    setEndTime(date);
  };

  const bookSlot = () => {
    if (!startTime || !endTime) {
      Alert.alert('Please select slots first');
      return;
    }
    if (selectedSlotsArray.length < 1) {
      selectedSlotsArray.push([
        startTime,
        endTime,
      ]);
      Alert.alert('Slot booked successfully');
      setStartTime(null);
      setEndTime(null);
      return;
    }
    if (!checkSlotAvailability()) {
      Alert.alert('Selected slot is not available');
      return;
    }
    selectedSlotsArray.push([
      startTime,
      endTime,
    ]);
    selectedSlotsArray.sort(([a], [b]) => a < b ? -1 : 1);
    Alert.alert('Selected slot is booked successfully');
    setStartTime(null);
    setEndTime(null);
  }

  const checkSlotAvailability = () => {
    for (let index = 0; index < selectedSlotsArray.length; index++) {
      if (
        startTime < selectedSlotsArray[index][1] &&
        endTime > selectedSlotsArray[index][0]
      ) {
        return false;
      }
    }
    return true;
  }
  const getSelectedSlots = () => {
    let convertedSlots = [];
    selectedSlotsArray.forEach((slot) => {
      convertedSlots.push(` ${slot[0].toLocaleTimeString('en-US')}-${slot[1].toLocaleTimeString('en-US')}`
      );
    })
    return convertedSlots;
  }

  return (
    <>
      <View>
        <View style={styles.container}>
          <Text>
            {startTime
              ? startTime.toLocaleTimeString('en-US')
              : 'Choose Start Time'}
          </Text>
          <Button text={'Start Time'} onPress={() => setIsOpen(true)} />
        </View>
        <View style={styles.container}>
          <Text>
            {endTime ? endTime.toLocaleTimeString('en-US') : 'Chose End Time'}
          </Text>
          <Button text={'End Time'} onPress={() => setIsOpenEnd(true)} />
        </View>
        <View style={{alignContent: 'center', alignItems: 'center', marginVertical:50}}>
          <Button text={'Book Slot'} onPress={() => {bookSlot()}} />
        </View>
        <View style={{alignContent: 'center', alignItems: 'center', marginVertical:50}}>
          <Text>Selected slots</Text>
          <Text>{`${getSelectedSlots()}`}</Text>
        </View>

        <DatePicker
          modal
          open={isOpen}
          date={new Date()}
          onConfirm={date => {
            setSTime(date);
          }}
          onCancel={() => {
            setIsOpen(false);
          }}
        />
        <DatePicker
          modal
          open={isOpenEnd}
          date={startTime ?? new Date()}
          onConfirm={date => {
            setETime(date);
          }}
          onCancel={() => {
            setIsOpenEnd(false);
          }}
        />
      </View>
    </>
  );
};

export default calendar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center'
  },
})