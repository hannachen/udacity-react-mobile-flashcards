import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { gray } from '../utils/colors'

export default function({ children, onPress, containerStyle = {}, textStyle = {}, disabled = false }) {
  return(
    disabled
    ? (
      <View style={[styles.container, { borderWidth: 1, borderColor: gray }]}>
        <Text style={[styles.reset, { color: gray }]}>{children}</Text>
      </View>
    )
    : (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.container, containerStyle]}>
        <Text style={[styles.reset, textStyle]}>{children}</Text>
      </TouchableOpacity>
    )
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    padding: 15,
    paddingLeft: 25,
    paddingRight: 25,
    margin: 10,
  },
  reset: {
    fontSize: 16,
    textAlign: 'center',
  }
})