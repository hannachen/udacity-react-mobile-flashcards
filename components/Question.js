import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function({ question, answer, showAnswer }) {
  return(
    <View style={[styles.center, {flex: 2}]}>
      {showAnswer
        ? <Text style={styles.title}>{answer}</Text>
        : <Text style={styles.title}>{question}</Text>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    textAlign: 'center'
  },
  center: {
    paddingTop: 30,
    paddingBottom: 30,
  },
})