import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { getDecks } from '../actions/index'
import { AppLoading } from 'expo'
import { purple, white, gray } from '../utils/colors'

class Decks extends Component {
  state = {
    ready: false
  }
  componentDidMount() {
    const { getDecks } = this.props

    getDecks()
      .then((entries) => this.setState(() => ({
        ready: true
      })))
  }
  renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => this.props.navigation.navigate(
        'DeckDetail',
        { entryId: item.key, title: item.title }
      )}
    >
      <Text style={styles.itemText}>{item.title}</Text>
      <Text>{item.questions.length} cards</Text>
    </TouchableOpacity>
  )
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: purple,
        }}
      />
    );
  }
  render() {
    const { decks } = this.props
    const { ready } = this.state

    if (!ready) {
      return <AppLoading />
    }

    return (
      <View style={{flex: 1}}>
        <FlatList
          data={decks}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    flex: 1,
    padding: 20,
    alignItems: 'center'
  },
  itemText: {
    color: purple,
  }
})

function mapStateToProps({ decks }) {
  return {
    decks: Object.keys(decks).map((key) => {
      const deck = decks[key]
      deck['key'] = key
      return deck
    })
  }
}

export default connect(mapStateToProps, { getDecks })(Decks)