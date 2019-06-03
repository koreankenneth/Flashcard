import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'
import DeckList from './components/DeckList'
import AddDeck from './components/AddDeck'
import DeckMain from './components/DeckMain'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import QuizResult from './components/QuizResult'
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation'
import { setLocalNotification } from './utils/helper'

class DeckListScreen extends Component {
  render() {
    return (
      <DeckList navigation={this.props.navigation} />
    )
  }
}

class AddDeckScreen extends Component {
  render() {
    return (
      <AddDeck navigation={this.props.navigation} />
    )
  }
}

class AddCardScreen extends Component {
  render () {
    return (
      <AddCard navigation={this.props.navigation} />
    )
  }
}

class QuizScreen extends Component {
  render () {
    return (
      <Quiz navigation={this.props.navigation} />
    )
  }
}

class QuizResultScreen extends Component {
  render () {
    return (
      <QuizResult navigation={this.props.navigation} />
    )
  }
}

const TabNavigator = createBottomTabNavigator({
  'Deck List': DeckListScreen,
  'Add Deck': AddDeckScreen,
});

const MainNavigator = createStackNavigator({
  Home: TabNavigator,
  DeckMain: DeckMain,
  AddCard: AddCardScreen,
  Quiz: QuizScreen,
  QuizResult: QuizResultScreen,
})

const AppContainer = createAppContainer(MainNavigator);

class App extends Component {
  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer, middleware)}>
        <AppContainer />
      </Provider>
    )
  }
}
export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
