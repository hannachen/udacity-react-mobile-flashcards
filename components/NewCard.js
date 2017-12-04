import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, Keyboard, KeyboardAvoidingView, DeviceEventEmitter, Platform, StyleSheet } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { saveDeck } from '../actions'
import Button from './Button'
import { gray } from '../utils/colors'

class NewCard extends Component {
  state = {
    card: {
      question: '',
      answer: ''
    }
  }
  changeQuestion = (question) => {
    const { card } = this.state
    card['question'] = question
    this.setState(card)
  }
  changeAnswer = (answer) => {
    const { card } = this.state
    card['answer'] = answer
    this.setState(card)
  }
  submitCard = () => {
    const { card } = this.state
    const { deck, addCard, goBack } = this.props

    deck['questions'].push(card)

    Keyboard.dismiss()

    addCard({ key: deck.key, deck })
      .then(() => {
        goBack()
        DeviceEventEmitter.emit('goback')
      })
  }

  render() {
    const { question, answer } = this.state.card
    const inputStyles = [styles.input, (Platform.OS === 'ios' ? styles.iosInput : styles.none )]

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior='padding'
      >
        <Text style={styles.title}>Add a card</Text>
        <TextInput
          name={question}
          value={question}
          placeholder='Question'
          returnKeyType='next'
          style={inputStyles}
          onChangeText={this.changeQuestion}
        />
        <TextInput
          name={answer}
          value={answer}
          placeholder='Answer'
          returnKeyType='done'
          style={inputStyles}
          onChangeText={this.changeAnswer}
        />
        <Button
          onPress={this.submitCard}
          disabled={(question.length === 0 || answer.length === 0)}
          containerStyle={{borderWidth: 1}}
        >
          Create Card
        </Button>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingTop: 30,
    paddingBottom: 30,
  },
  title: {
    fontSize: 26,
    textAlign: 'center'
  },
  input: {
    width: '100%',
    padding: 20,
    margin: 15,
  },
  iosInput: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: gray
  },
  none: {
  }
})

function mapStateToProps({ decks }, ownProps) {
  const { entryId } = ownProps.navigation.state.params
  return {
    deck: decks[entryId]
  }
}

function mapDispatchToProps(dispatch, { navigation }) {
  return {
    addCard: (data) => dispatch(saveDeck(data)),
    goBack: () => navigation.goBack(),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCard)