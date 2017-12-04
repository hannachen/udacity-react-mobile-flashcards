import React, { Component } from 'react'
import { View, Text, TouchableOpacity, DeviceEventEmitter, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { getDeck, removeDeck } from '../actions'
import { AppLoading } from 'expo'
import DeckItem from './DeckItem'
import Button from './Button'
import { purple, white } from '../utils/colors'

class DeckDetail extends Component {
  state = {
    ready: false,
    deck: null
  }
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params
    return {
      title: `${title}`
    }
  }
  componentWillMount() {
    DeviceEventEmitter.addListener('goback', () => {
      this.forceUpdate()
    })
  }
  componentDidMount() {
    const { getDeck } = this.props
    getDeck()
      .then((deck) => this.setState({
        ready: true
      }))
  }
  goTo = (NavKey) => {
    const { deck } = this.props
    this.props.navigation.navigate(NavKey, { entryId: deck.key })
  }
  addCard = () => this.goTo('NewCard')
  startQuiz = () => this.goTo('Quiz')
  deleteDeck = () => {
    const { remove, goBack } = this.props
    remove()
    goBack()
  }
  shouldComponentUpdate (nextProps) {
    return nextProps.deck !== null && nextProps.deck !== undefined
  }
  render() {
    const { deck } = this.props
    const { ready } = this.state

    if (!ready) {
      return <AppLoading />
    }

    return (
      <View style={styles.container}>
        <DeckItem title={deck.title} questions={deck.questions} />

        <View style={styles.buttonContainer}>
          <Button
            onPress={this.addCard}
            containerStyle={{ borderWidth: 1}}
          >
            <Text>Add Card</Text>
          </Button>

          <Button
            onPress={this.startQuiz}
            disabled={deck.questions.length === 0}
            containerStyle={{ borderWidth: 1, backgroundColor: purple }}
            textStyle={{ color: white }}
          >
            Start Quiz
          </Button>

          <TouchableOpacity
            onPress={this.deleteDeck}
            style={styles.center}>
            <Text>Delete Deck</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  center: {
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 35,
    marginLeft: 25,
    marginRight: 25,
  },
  buttonContainer: {
    flex: 3,
    width: 170,
  }
})

function mapStateToProps({ decks }, { navigation }) {
  const { entryId } = navigation.state.params

  return {
    entryId,
    deck: decks[entryId]
  }
}

function mapDispatchToProps(dispatch, { navigation }) {
  const { entryId } = navigation.state.params

  return {
    getDeck: () => dispatch(getDeck(entryId)),
    remove: () => dispatch(removeDeck(entryId)),
    goBack: () => navigation.goBack(),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetail)