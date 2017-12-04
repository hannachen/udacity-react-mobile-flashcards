import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Button from './Button'
import { purple, white } from '../utils/colors'

export default function({ correct, incorrect, restartQuiz, toHome }) {
  return(
    <View style={styles.container}>
      <Text style={styles.title}>Your score</Text>
      <Text style={styles.subtitle}>Correct: {correct}</Text>
      <Text style={styles.subtitle}>Incorrect: {incorrect}</Text>

      <View>
        <Button
          onPress={restartQuiz}
          containerStyle={styles.solid}
          textStyle={{color: white}}
        >
          Restart Quiz
        </Button>
        <Button
          onPress={toHome}
          containerStyle={{ borderWidth: 1, marginTop: 15 }}
        >
          Back to Deck
        </Button>
      </View>
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
  },
  solid: {
    borderWidth: 1,
    backgroundColor: purple,
    marginTop: 50,
  }
})