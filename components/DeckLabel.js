import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { white } from '../utils/colors'

class DeckLabel extends Component {
  render () {
    const { navigation, title, decks } = this.props
    return (
      <View style={styles.item}>
        <TouchableOpacity
          onPress={() => navigation.navigate(
            'DeckMain',
            { title: title }
          )}
        >
          <Text style={styles.text}>{title}</Text>
          <Text style={styles.text}>{decks[title].questions.length} cards</Text>
        </TouchableOpacity>
      </View>
    )
  }
}


function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(DeckLabel)

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: 16,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
  },
  text: {
    textAlign: 'center',
  }
});
