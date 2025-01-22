import { View, Pressable, SafeAreaView, StyleSheet, Alert, TextInput, Image } from "react-native";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { MonoText } from "@/components/StyledText";
import Google from '../assets/images/google.png';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    const handleLogin = async () => {
        // Prepare the data to be sent to the server
        const requestData = {
            email,
            password,
        };

        console.log('Data to be sent:', requestData);

        // Dummy API URL
        const apiUrl = 'dummy.api.endpoint/login';

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

            // Show success message
            Alert.alert('Success', 'Logged in successfully!');
        } catch (error) {
            console.error('Error during login:', error);
            Alert.alert('Error', 'Something went wrong. Please try again.');
        }
    };

    const goHome = () => {
        router.push('/home');
    };

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <MonoText style={styles.title}>Login page</MonoText>

            <MonoText style={styles.boxText}>
                Don't have an account?{' '}
                <MonoText style={styles.boxLink}>Create one</MonoText>
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
                    />
                </View>

                <View>
                    <MonoText style={styles.label}>Enter your password</MonoText>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />
                </View>

                <Pressable style={styles.button}
                 onPress={goHome}
                //  onPress={handleLogin}
                 >
                    <MonoText style={styles.buttonText}>Login</MonoText>
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
        </SafeAreaView>
    )
};

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