import React, { Component } from 'react'
import { View, ScrollView, Text, TextInput, TouchableOpacity, Keyboard, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { saveDeck } from '../actions'
import uuid from 'uuid/v1'
import Button from './Button'
import { gray } from '../utils/colors'

class NewDeck extends Component {
  state = {
    title: '',
    questions: []
  }
  changeTitle = (title) => {
    this.setState({title})
  }
  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({
      key: 'NewDeck'
    }))
  }
  submitDeck = () => {
    const key = uuid()
    const deck = this.state
    this.props.dispatch(saveDeck({ key, deck }))

    Keyboard.dismiss()

    this.toHome()
  }

  render() {
    const { title } = this.state
    const inputStyles = [styles.input, (Platform.OS === 'ios' ? styles.iosInput : styles.none )]

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior='padding'
      >
        <ScrollView
          scrollEnabled={false}
          keyboardShouldPersistTaps='never'
          style={{flex: 1}}>
          <Text style={styles.title}>What is the title of your new deck?</Text>
          <TextInput
            style={inputStyles}
            returnKeyType='done'
            onChangeText={this.changeTitle}
            onSubmitEditing={this.submitDeck}
            placeholder='Deck Title'
            value={title}
          />
        </ScrollView>
        <Button
          onPress={this.submitDeck}
          disabled={title.length === 0}
        >
          Submit
        </Button>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    marginRight: 30,
    marginLeft: 30,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    paddingBottom: 30,
  },
  input: {
    width: '100%',
    padding: 20,
  },
  iosInput: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: gray
  },
  none: {
  }
})

export default connect()(NewDeck)