import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, Button } from 'react-native'
import FlipComponent from 'react-native-flip-component'
import { red, blue, white, gray } from '../utils/colors'
import TextButton from './TextButton'

class Quiz extends Component {
  state = {
    index: 0,
    count: 0,
    correctAnswerCount: 0,
    isFlipped: false
  }

  componentDidMount() {
    const { title } = this.props.navigation.state.params
    const deck = this.props.decks[title]
    this.setState({ deck, count: deck.questions.length })
  }

  submitAnswer = (isCorrect) => {
    const { index, deck, correctAnswerCount, count } = this.state
    let nextQuizNo = index + 1
    let score = correctAnswerCount

    if (deck.questions[index].correct === isCorrect) {
      score += 1
    }

    if (nextQuizNo >= deck.questions.length) {
      this.props.navigation.navigate(
        'QuizResult',
        {
          correctAnswerCount: score,
          count: count,
        }
      )
      return
    }

    this.setState({
      index: nextQuizNo,
      correctAnswerCount: score,
    })
  }

  render() {
    const { title } = this.props.navigation.state.params
    const { index, count } = this.state
    const deck = this.props.decks[title]
    if (count === 0) {
      return (
        <View>
          <Text style={styles.title}>
            Sorry, you cannot take a quiz{'\n'}
            because there are no cards in the deck.
          </Text>
        </View>
      )
    }
    const question = deck.questions[index].question
    const answer = deck.questions[index].answer


    return (
      <View>
        <Text style={styles.text}>
          {index + 1}/{count}
        </Text>
        <FlipComponent
          style={{
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          isFlipped={this.state.isFlipped}
          frontView={
            <View >
              <Text style={styles.title}>
                {question}
              </Text>
            </View>
          }
          backView={
            <View>
              <Text style={styles.title}>
                {answer}
              </Text>
            </View>
          }
        />
        <Button
          onPress={() => {
            this.setState({ isFlipped: !this.state.isFlipped })
          }}
          title={this.state.isFlipped ? 'Show Question' : 'Show Answer'}
        />
        <View style={styles.btnContainer}>
          <TextButton
            style={styles.correct}
            onPress={() => this.submitAnswer(true)}>
            {'\n'}Correct
          </TextButton>
          <TextButton
            style={styles.incorrect}
            onPress={() => this.submitAnswer(false)}>
            {'\n'}Incorrect
          </TextButton>
        </View>
      </View>
    )
  }
}


function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(Quiz)

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginTop: 200,
    marginBottom: 200,
    fontSize: 20,
  },
  text: {
    textAlign: 'left',
    fontSize: 20,
    color: gray,
  },
  correct: {
    width: 120,
    height: 65,
    color: white,
    backgroundColor: blue,
    fontSize: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
  incorrect: {
    width: 120,
    height: 65,
    color: white,
    backgroundColor: red,
    fontSize: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    marginTop: 200,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
})
