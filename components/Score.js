import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function({ correct, incorrect }) {
  return(
    <View style={styles.container}>
      <Text style={styles.title}>Your score</Text>
      <Text style={styles.subtitle}>Correct: {correct}</Text>
      <Text style={styles.subtitle}>Incorrect: {incorrect}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    margin: 30,
  },
  subtitle: {
    fontSize: 18,
  }
})