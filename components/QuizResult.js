import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet } from 'react-native'
import TextButton from './TextButton'

class QuizResult extends Component {

  render() {

    const { correctAnswerCount, count, title } = this.props.navigation.state.params

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Result</Text>
        <Text style={styles.body}>{correctAnswerCount} out of {count}</Text>
        <Text style={styles.body}>{Math.round(correctAnswerCount/count*100)}%</Text>
        <TextButton
          style={styles.button}
          onPress={() => this.props.navigation.navigate(
            'Quiz',
            {
              titie: title,
            }
          )}>
          Restart Quiz
        </TextButton>
        <TextButton
          style={styles.button}
          onPress={() => this.props.navigation.navigate(
            'Home'
          )}>
          Go Home
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

export default connect(mapStateToProps)(QuizResult)

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginTop: 200,
    marginBottom: 50,
    fontSize: 20,
  },
  body: {
    textAlign: 'center',
    marginTop: 5,
    fontSize: 20,
  },
  button: {
    marginTop: 30,
    fontSize: 16,
  },
})
