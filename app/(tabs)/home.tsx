import { StyleSheet, Animated, Pressable, Image, Platform, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';

import { Text, View } from '@/components/Themed';
import { Stack, useRouter } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';
import { MonoText } from '@/components/StyledText';
import { useState, useEffect, useRef } from 'react'

import hero from '../../assets/images/travel-3.jpg';
import { FadeView, SpringBox, SequenceAnimation, ParallelAnimation } from '@/animations/animated';
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from '@react-native-community/datetimepicker';

import RNPickerSelect from 'react-native-picker-select';

export default function TabOneScreen() {
  const router = useRouter();
  // const [selectedValue, setSelectedValue] = useState("java");
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [datePickerMode, setDatePickerMode] = useState('date');

  const onDateChange = (_, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const showDatepicker = (mode) => {
    setShowDatePicker(true);
    setDatePickerMode(mode);
  };

  const formatDate = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const formatTime = (date) => {
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  const handlePress = () => {
    router.push('/');
  };
  const routeProducts = () => {
    router.push('/products');
  };

  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1, // Target opacity
      duration: 2000, // Duration in milliseconds
      useNativeDriver: true, // Optimize animation
    }).start(); // Start animation
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* <Stack.Screen options={{ headerTitle: "" }} /> */}

      {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', backgroundColor: '#eee' }}>
        <MonoText style={{ fontSize: 15 }}>Popular places</MonoText>

        <MonoText style={{ fontSize: 12, color: 'blue', textDecorationLine: 'underline' }}>See more</MonoText>
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


      <Pressable style={styles.button} onPress={routeProducts}>
        <Text style={styles.buttonText}>Go to products</Text>
      </Pressable> */}

      {/* Picker tests */}

      {/* <RNPickerSelect
        onValueChange={(value) => console.log(value)}
        style={styles.newPicker}
        items={[
          { label: 'Football', value: 'football' },
          { label: 'Baseball', value: 'baseball' },
          { label: 'Hockey', value: 'hockey' },
        ]}
      /> */}

      <Text style={styles.label}>Select Programming Language:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="JavaScript" value="javascript" />
          <Picker.Item label="Python" value="python" />
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="C++" value="cpp" />
          <Picker.Item label="Ruby" value="ruby" />
          <Picker.Item label="Swift" value="swift" />
        </Picker>
      </View>

      <Text style={styles.selectedValue}>
        Selected: {selectedLanguage}
      </Text>

      {/* Date Picker Example */}
      <View style={styles.dateSection}>
        <Text style={styles.label}>Selected Date and Time:</Text>
        <Text style={styles.dateDisplay}>
          Date: {formatDate(date)}
        </Text>
        <Text style={styles.dateDisplay}>
          Time: {formatTime(date)}
        </Text>

        {/* Date & Time Picker Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => showDatepicker('date')}
          >
            <Text style={styles.buttonText}>Pick Date</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => showDatepicker('time')}
          >
            <Text style={styles.buttonText}>Pick Time</Text>
          </TouchableOpacity>
        </View>

        {/* Date Picker */}
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={datePickerMode}
            is24Hour={true}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onDateChange}
            style={styles.datePicker}
          />
        )}
      </View>

      <FadeView>
        <Text>This fades in!</Text>
      </FadeView>

      <SpringBox />
      <SequenceAnimation />
      <ParallelAnimation />

    </ScrollView>
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
  newPicker: {
    backgroundColor: '#fff'
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
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  picker: {
    height: 50,
  },
  selectedValue: {
    fontSize: 16,
    marginBottom: 20,
  },
  dateSection: {
    marginTop: 20,
  },
  dateDisplay: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    width: '48%',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  datePicker: {
    marginTop: 10,
  },
  // button: {
  //   backgroundColor: '#007bff',
  //   paddingVertical: 12,
  //   paddingHorizontal: 20,
  //   borderRadius: 8,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   flexDirection: 'row',
  // },
  // buttonText: {
  //   color: '#fff',
  //   fontSize: 16,
  //   fontWeight: 'bold',
  // },
});
