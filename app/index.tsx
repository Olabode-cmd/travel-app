import React, { useRef } from 'react';
import { View, Text, Pressable, StyleSheet, ImageBackground, Dimensions, Animated } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';

import background from '../assets/images/travel-1.jpg';

export default function Signin() {
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95, // Scale down
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1, // Scale back to normal
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    router.push('/home');
  };

  return (
    <ImageBackground source={background} style={styles.container}>
      <View style={styles.overlay} />
      <Stack.Screen options={{ headerShown: false }} />

      <View >
        <View style={styles.skipflex}>
          <Pressable style={styles.skip}>
            <Text style={styles.skipText}>Skip</Text>
          </Pressable>
        </View>
        <Text style={styles.title}>Explore Indonesia With Us</Text>
        <Text style={styles.subtitle}>We Travelin' are ready to help you on your trip around Indonesia</Text>

        {/* <Pressable style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Go to home</Text>
        </Pressable> */}
      </View>

      {/* White Box */}
      <View style={styles.bottomBox}>
        <Animated.View style={[styles.startButton, { transform: [{ scale: scaleAnim }] }]}>
          <Pressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            // onPress={() => console.log('Button Pressed')}
            style={styles.pressableContent}
          >
            <Text style={styles.boxTitle}>Let's Get Started</Text>
            <AntDesign name="arrowright" size={20} color="white" />
          </Pressable>
        </Animated.View>
        
        <Pressable onPress={handlePress}>
          <Text style={styles.boxText}>
            Already have an account?{' '}
            <Text style={styles.boxLink}>Login</Text>
          </Text>
        </Pressable>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundSize: 'cover',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    fontSize: 74,
    fontWeight: 'medium',
    color: '#fff',
    marginTop: 50,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginTop: 14,
  },
  skipflex: {
    flexDirection: 'row', // Horizontal layout
    justifyContent: 'flex-end', // Align child elements to the right
    alignItems: 'center', // Vertically align items
  },
  skip: {
    backgroundColor: 'transparent', // Button background
    borderColor: '#FFFFFF', // Border color for contrast
    borderWidth: .5, // Border width for better visibility
    paddingVertical: 8, // Vertical padding for better touch area
    paddingHorizontal: 16, // Horizontal padding
    borderRadius: 5, // Rounded corners
  },
  skipText: {
    color: '#FFFFFF', // Text color for contrast
    fontSize: 14, // Font size for better visibility
    fontWeight: 'bold', // Bold text
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor: '#eee'
  },
  button: {
    backgroundColor: '#007bff', // Button background color
    paddingVertical: 12,         // Vertical padding
    paddingHorizontal: 20,       // Horizontal padding
    borderRadius: 8,            // Rounded corners
    justifyContent: 'center',   // Center content vertically
    alignItems: 'center',       // Center content horizontally
    flexDirection: 'row',       // Ensure text and content are aligned properly   // Center content vertically
  },
  buttonText: {
    color: '#fff',              // Text color
    fontSize: 16,               // Font size
    fontWeight: 'bold',         // Bold text
  },
  bottomBox: {
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('window').width,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    paddingBottom: 45,
    alignItems: 'center',
  },
  boxTitle: {
    fontSize: 18,
    fontWeight: 'semibold',
    color: '#fff',
    marginRight: 5,
  },
  boxLink: {
    fontSize: 16,
    color: '#007BFF',
    fontWeight: '500',
  },
  boxText: {
    fontSize: 16,
    color: '#000',
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
    width: '100%',
  },
  pressableContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});