import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet } from 'react-native'
import TextButton from './TextButton'
import { gray } from '../utils/colors'
import { deleteDeck } from '../actions'
import { NavigationActions } from 'react-navigation'
import { AppLoading } from 'expo'
import { removeDeck } from '../utils/api'


class DeckMain extends Component {

  delDeck = () => {
    const { title } = this.props.navigation.state.params 
    const { dispatch } = this.props
    dispatch(deleteDeck(title))
    this.props.navigation.dispatch(NavigationActions.back())
    removeDeck(title)
  }

  render() {
    const { title } = this.props.navigation.state.params 
    const { decks } = this.props
    if (!decks[title]) {
      return <AppLoading />
    }

    return (
      <View style={styles.container}>
        <Text
          style={styles.title}
        >
          {title}
        </Text>
        <Text style={styles.text}>{decks[title].questions.length} cards</Text>
        <TextButton
          style={styles.button}
          onPress={() => this.props.navigation.navigate(
            'AddCard',
            { title: title }
          )}>
          Add Card
        </TextButton>
        <TextButton
          style={styles.button}
          onPress={() => this.props.navigation.navigate(
            'Quiz',
            { title: title }
          )}>
          Start Quiz
        </TextButton>
        <TextButton
          style={styles.text}
          onPress={this.delDeck}>
          Delete
        </TextButton>
      </View>
    )
  }
}

function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(DeckMain)

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 200,
    fontSize: 30,
  },
  text: {
    textAlign: 'center',
    fontSize: 17,
    color: gray,
    marginBottom: 200,
  },
  button: {
    marginBottom: 30,
    fontSize: 20,
  },
});
