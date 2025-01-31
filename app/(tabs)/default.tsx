import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'

export default function Default() {
  return (
    <ScrollView style={styles.container}>
      <Text>default</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
        paddingVertical: 15,
        paddingHorizontal: 8,
    }
})