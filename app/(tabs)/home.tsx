import { StyleSheet, TouchableOpacity, Pressable, Image } from 'react-native';

import { Text, View } from '@/components/Themed';
import { Stack, useRouter } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';
import { MonoText } from '@/components/StyledText';

import hero from '../../assets/images/travel-3.jpg';

export default function TabOneScreen() {
  const router = useRouter();

  const handlePress = () => {
    router.push('/');
  };

  return (
    <View style={styles.container}>
      {/* <Stack.Screen options={{ headerTitle: "" }} /> */}
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', backgroundColor: '#eee' }}>
        <MonoText style={{fontSize: 15 }}>Popular places</MonoText>

        <MonoText style={{fontSize: 12, color: 'blue', textDecorationLine: 'underline'}}>See more</MonoText>
      </View>

      <View style={{ backgroundColor: '#eee', position: 'relative' }}>
        <Image
          source={hero}
          style={{
            width: '100%',
            height: 200,
            marginTop: 20,
            borderRadius: 12,
          }}
        />

        <View
          style={{
            position: 'absolute',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Use "rgba" for transparency
            bottom: 0,
            left: 0,
            right: 0,
            padding: 10,
            zIndex: 10,
            borderBottomLeftRadius: 12, // Match the image's border radius
            borderBottomRightRadius: 12, // Match the image's border radius
          }}
        >
          <MonoText style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
            Venice, Italy
          </MonoText>
          <MonoText style={{ color: 'white', fontSize: 14, marginTop: 5 }}>
            4.7<AntDesign name="star" size={16} color="yellow" /> (3245)
          </MonoText>
        </View>
      </View>

      <View style={{ marginTop: 25 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', backgroundColor: '#eee' }}>
          <MonoText style={{ fontSize: 15 }}>Recommendations for you</MonoText>

          <MonoText style={{ fontSize: 12, color: 'blue', textDecorationLine: 'underline' }}>See more</MonoText>
        </View>
      </View>


      {/* <Pressable style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Go to sign in</Text>
      </Pressable> */}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#eee',
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
