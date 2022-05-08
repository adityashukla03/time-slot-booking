import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Button = ({text, onPress}) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>{text}</Text>
  </TouchableOpacity>
);

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'skyblue',
    width: '40%'
  },
  text: {
    textAlign: 'center',
    padding: 16
  }
});