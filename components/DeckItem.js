import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { gray } from '../utils/colors'

export default function({ title, questions }) {
  return(
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{questions.length} cards</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    paddingTop: 30,
    paddingBottom: 30,
  },
  title: {
    fontSize: 26,
    textAlign: 'center'
  },
  subtitle: {
    color: gray,
    fontSize: 16,
    textAlign: 'center'
  }
})