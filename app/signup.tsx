import { View, Pressable, SafeAreaView, StyleSheet, Alert, TextInput, Image, ScrollView, ActivityIndicator } from "react-native";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { MonoText } from "@/components/StyledText";
import Google from '../assets/images/google.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [username, setUsername] = useState('');

    const [loading, setLoading] = useState(false)

    const router = useRouter();

    const handleSignup = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setLoading(true);

        const requestData = {
            email: email,
            password: password,
            phone_number: phoneNumber,
            username: username
        };

        // console.log('Data to be sent:', requestData);

        // Dummy API URL
        const apiUrl = 'https://inevitable-helaina-nilvfgfgfhujkiki-38773413.koyeb.app/user/v1/register/';

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            const responseData = await response.json();
            console.log('Server Response:', responseData);

            if (responseData.status === 200) {
                const data = responseData;
                await AsyncStorage.setItem('accessToken', data.access);
                Alert.alert('Registration successful')
                console.log('Registration successful')
                router.push('/home')
            }
        } catch (error) {
            console.error('Error during login:', error);
            Alert.alert('Error', 'Something went wrong. Please try again.');
        } finally {
            setLoading(false)
        }
    }

    const routeToLogin = () => {
        router.push('/login');
    }
    return (
        <ScrollView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <MonoText style={styles.title}>Create Account</MonoText>

            <MonoText style={styles.boxText}>
                Already have an account?{' '}
                <Pressable onPress={routeToLogin}>
                    <MonoText style={styles.boxLink}>Login</MonoText>
                </Pressable>
            </MonoText>

            <View style={styles.loginBox}>
                <View>
                    <MonoText style={styles.label}>Enter your email</MonoText>
                    <TextInput
                        style={styles.input}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        inputMode="email"
                    />
                </View>

                <View>
                    <MonoText style={styles.label}>Enter your phone number</MonoText>
                    <TextInput
                        style={styles.input}
                        // secureTextEntry={true}
                        value={phoneNumber}
                        onChangeText={(text) => setPhoneNumber(text)}
                        inputMode="text"
                    />
                </View>

                <View>
                    <MonoText style={styles.label}>Choose a username</MonoText>
                    <TextInput
                        style={styles.input}
                        // secureTextEntry={true}
                        value={username}
                        onChangeText={(text) => setUsername(text)}
                        inputMode="text"
                    />
                </View>

                <View>
                    <MonoText style={styles.label}>Enter your password</MonoText>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        inputMode="text"
                    />
                </View>

                <Pressable style={styles.button}
                    onPress={handleSignup}
                >
                    <MonoText style={styles.buttonText}>
                        {loading ? <ActivityIndicator /> : "Create account"}
                    </MonoText>
                </Pressable>

                <View style={styles.moreContainer}>
                    <View style={styles.dividerContainer}>
                        <View style={styles.line} />
                        <MonoText style={styles.dividerText}>or sign up with</MonoText>
                        <View style={styles.line} />
                    </View>

                    <View style={styles.buttonContainer}>
                        <Pressable style={styles.buttonIcon}>
                            <Image
                                source={Google}
                                style={styles.icon}
                            />
                        </Pressable>

                        <Pressable style={styles.buttonIcon}>
                            <Image
                                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/512px-Apple_logo_black.svg.png' }}
                                style={styles.icon}
                            />
                        </Pressable>

                        <Pressable style={styles.buttonIcon}>
                            <Image
                                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/512px-Facebook_Logo_%282019%29.png' }}
                                style={styles.icon}
                            />
                        </Pressable>
                    </View>


                    <MonoText style={styles.bottomText}>Lorem ipsum dolor sit amet Sequi recusandae aspernatur aperiam porro sit.</MonoText>
                </View>
            </View>
        </ScrollView>
    )
}

export default SignUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 80,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: 30,
    },
    subtitle: {
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    boxLink: {
        fontSize: 14,
        color: '#920fcc',
        fontWeight: '500',
    },
    boxText: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 20,
        color: '#999',
    },
    input: {
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 6,
        fontSize: 14,
        marginBottom: 20,
        backgroundColor: '#e4e4e4',
        fontFamily: 'SpaceMono'
    },
    loginBox: {
        marginTop: 40,
    },
    label: {
        marginBottom: 5,
        fontSize: 14,
        color: '#999'
    },
    button: {
        padding: 18,
        fontSize: 16,
        backgroundColor: '#920fcc',
        textAlign: 'center',
        borderRadius: 6,
        fontFamily: 'SpaceMono'
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '98%',
        marginVertical: 15,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#ccc',
    },
    dividerText: {
        marginHorizontal: 8,
        fontSize: 14,
        color: '#555',
        fontFamily: 'SpaceMono',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        width: '80%',
    },
    buttonIcon: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60,
    },
    icon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    socialText: {
        fontSize: 16,
        color: '#000',
    },
    moreContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    bottomText: {
        fontSize: 14,
        color: '#aaa',
        marginTop: 65,
        textAlign: 'center',
    },
})