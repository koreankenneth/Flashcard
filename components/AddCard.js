import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TextInput, Switch, StyleSheet } from 'react-native'
import TextButton from './TextButton'
import { formatCard } from '../utils/helper'
import { addCard} from '../actions'
import { submitCard } from '../utils/api'
import { NavigationActions } from 'react-navigation'

class AddCard extends Component {
  state = {
    question: '',
    answer: '',
    correct: false,
  }

  addCard = () => {
    const { title } = this.props.navigation.state.params 
    const { dispatch } = this.props
    const { question, answer, correct } = this.state
    const card = formatCard(question, answer, correct)

    this.setState({ question: '', answer: '', correct: false })

    dispatch(addCard(title, card))
    this.props.navigation.dispatch(NavigationActions.back())
    submitCard(title, card)
  }

  render () {
    return (
      <View style={styles.container}>
        <TextInput 
          style={styles.textbox}
          onChangeText={(question) => this.setState({question})}
          value={this.state.text}
          placeholder='Question'
        />
        <TextInput 
          style={styles.textbox}
          onChangeText={(answer) => this.setState({answer})}
          value={this.state.text}
          placeholder='Answer'
        />
        <View style={styles.swtichContainer}>
          <Text style={styles.text}>The answer is   {this.state.correct ? 'CORRECT' : 'INCORRECT'}   </Text>
          <Switch 
            onValueChange = {(correct) => this.setState({correct})} 
            value = {this.state.correct}
          />
        </View>
        <TextButton
          style={{ marginTop: 30 }}
          onPress={this.addCard}>
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

export default connect(mapStateToProps)(AddCard)

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
  },
  swtichContainer: {
    marginTop: 20, 
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  }
});

