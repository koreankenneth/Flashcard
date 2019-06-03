import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import TextButton from './TextButton'
import { formatDeck } from '../utils/helper'
import { addDeck} from '../actions'
import { submitDeck } from '../utils/api'
import { NavigationActions } from 'react-navigation'

class AddDeck extends Component {
  state = {}

  submitDeck = () => {
    const { dispatch } = this.props
    const deck = formatDeck(this.state.text)

    this.setState({ text: null })

    dispatch(addDeck(deck))
    this.props.navigation.dispatch(NavigationActions.back())
    submitDeck(deck)
  }

  render () {
    return (
      <View style={styles.container}>
        <Text>What is the title of your new deck?</Text>
        <TextInput 
          style={styles.textbox}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <TextButton
          style={{ marginTop: 30 }}
          onPress={this.submitDeck}>
          Submit
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

export default connect(mapStateToProps)(AddDeck)

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textbox: {
    height: 40, 
    width:'70%', 
    marginTop: 30, 
    borderColor: 'gray', 
    borderWidth: 1
  }
});

