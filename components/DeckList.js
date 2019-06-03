import React, { Component } from 'react'
import { ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native'
import DeckLabel from './DeckLabel'
import { connect } from 'react-redux'
import { fetchFlashcardResults } from '../utils/api'
import { receiveDecks } from '../actions'
import { AppLoading } from 'expo'
import TextButton from './TextButton'

import { AsyncStorage } from 'react-native'

class DeckList extends Component {
  state = {
    ready: false,
  }

  componentDidMount() {
    const { dispatch } = this.props

    fetchFlashcardResults()
      .then((decks) => {
        dispatch(receiveDecks(decks))
      })
      .then(() => this.setState(() => ({
        ready: true,
      })))
  }

  render() {
    const { decks, navigation } = this.props
    const { ready } = this.state

    if (ready === false) {
      return <AppLoading />
    }

    return (
      <ScrollView>
        {
          Object.keys(decks).map((key) => {
            return (
              <DeckLabel
                key={key}
                navigation={navigation}
                title={decks[key].title}
              />
            )
          })
        }
        <TextButton
          style={{marginTop:30}}
          onPress={() => AsyncStorage.removeItem('Flashcard:deck')}>
          Reset
        </TextButton>
      </ScrollView>
    )
  }
}



function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(DeckList)