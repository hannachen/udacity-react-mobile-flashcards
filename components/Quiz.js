import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'
import Button from './Button'
import Score from './Score'
import { green, red, gray, white } from '../utils/colors'

class Quiz extends Component {
  state = {
    counter: 1,
    showAnswer: false,
    correct: 0,
    incorrect: 0,
  }
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params
    return {
      title: `Quiz`
    }
  }
  toggle = () => {
    this.setState({
      showAnswer: !this.state.showAnswer
    })
  }
  correct = () => this.score('correct')
  incorrect = () => this.score('incorrect')
  score = (result) => {
    this.setState({
      [result]: this.state[result] + 1,
      counter: this.state.counter + 1
    })
  }
  toHome = () => {
    this.props.navigation.navigate('Home')
  }
  render() {
    const { deck } = this.props
    const { counter, showAnswer, correct, incorrect } = this.state

    if (deck.questions.length > 0 && (counter > deck.questions.length)) {

      clearLocalNotification()
        .then(setLocalNotification)

      return (
        <Score correct={correct} incorrect={incorrect} toHome={this.toHome} />
      )
    }

    return (
      <View style={styles.container}>
        <Text style={styles.page}>{`${counter}/${deck.questions.length}`}</Text>

        <View style={[styles.center, {flex: 2}]}>
          {showAnswer
            ? <Text style={styles.title}>{deck.questions[counter-1]['answer']}</Text>
            : <Text style={styles.title}>{deck.questions[counter-1]['question']}</Text>
          }
        </View>

        <TouchableOpacity onPress={this.toggle}>
          <Text>{showAnswer ? 'Question' : 'Answer'}</Text>
        </TouchableOpacity>

        <View style={styles.center}>

          <Button
            containerStyle={{backgroundColor: green}}
            textStyle={{color: white}}
            onPress={this.correct}>
            Correct
          </Button>

          <Button
            containerStyle={{backgroundColor: red}}
            textStyle={{color: white}}
            onPress={this.incorrect}>
            Incorrect
          </Button>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    paddingTop: 30,
    paddingBottom: 30,
  },
  page: {
    fontSize: 18,
    padding: 10,
    color: gray,
  },
  title: {
    fontSize: 26,
    textAlign: 'center'
  },
  subtitle: {
    color: gray,
    fontSize: 16,
    textAlign: 'center'
  },
})

function mapStateToProps({ decks }, { navigation }) {
  const { entryId } = navigation.state.params
  return {
    entryId,
    deck: decks[entryId]
  }
}

export default connect(mapStateToProps)(Quiz)