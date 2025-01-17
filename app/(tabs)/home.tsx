import { StyleSheet, TouchableOpacity, Pressable } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { Link, useRouter } from 'expo-router'

export default function TabOneScreen() {
  const router = useRouter();

  const handlePress = () => {
    router.push('/');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} />
      {/* <EditScreenInfo path="app/(tabs)/home.tsx" /> */}

      <Pressable style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Go to sign in</Text>
      </Pressable>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000'
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
});
