import React, { Component } from 'react'
import { View, Text, StatusBar } from 'react-native'
import { Constants } from 'expo'
import { Provider } from 'react-redux'
import store from './store'
import { setLocalNotification } from './utils/helpers'
import MainNavigator from './components/Navigation'
import { white } from './utils/colors'

function UdaciStatusBar({ backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent bckgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends Component {
  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <UdaciStatusBar
            backgroundColor={white}
          />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}