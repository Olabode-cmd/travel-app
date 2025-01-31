import { View, Pressable, SafeAreaView, StyleSheet, Alert, TextInput, Image, ActivityIndicator } from "react-native";
import { Stack, useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { MonoText } from "@/components/StyledText";
import Google from '../assets/images/google.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";

// API endpoint = https://inevitable-helaina-nilvfgfgfhujkiki-38773413.koyeb.app/
// email phone_number username password

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
        setVisible(!visible);
    }

    const router = useRouter();

    useEffect(() => {
        const fetchToken = async () => {
            const savedToken = await AsyncStorage.getItem('accessToken');
            setToken(savedToken);
        };

        fetchToken();
    }, []);

    useEffect(() => {
        if (token) {
            router.push('/home');
        }
    }, [token, router]);
    

    const handleLogin = async (e) => {
        // const logout = async () => {
        //     await AsyncStorage.removeItem('accessToken');
        //     console.log('Logged out')
        // }

        // logout();

        e.preventDefault();
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        if (!email.includes('@')) {
            Alert.alert('Error', 'Please enter a valid email address');
            return;
        }
        if (password.length < 8) {
            Alert.alert('Error', 'Password must be at least 8 characters long');
            return;
        }

        setLoading(true);
        
        try {
            const apiUrl = 'https://api.digitalfortressltd.com/user/login/';

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log('Server Response:', data);

            if (response.ok) {
                await AsyncStorage.setItem('accessToken', data.access);
                Alert.alert('Success', 'Logged in successfully!');
                console.log('Success', 'Logged in successfully!');
                router.push('/home')
                return { success: true, token: data.access };
            } else {
                Alert.alert('Error', data.message || 'Login failed');
                return { success: false, message: data.message || 'Login failed' };
            }
        } catch (error) {
            console.error('Error during login:', error);
            Alert.alert('Error', 'Something went wrong. Please try again.');
            return { success: false, message: 'An error occurred. Please try again.' };
        } finally {
            setLoading(false);
        }
    };

    const login = async (e) => {
        e.preventDefault();

        try {
            const apiUrl = 'https://inevitable-helaina-nilvfgfgfhujkiki-38773413.koyeb.app/user/login/';

            const response = await fetch(apiUrl, {
                method: "POST",
                body: JSON.stringify({ email, password }),
            })

            const data = await response.json();
            console.log('Server Response:', data);

            if(response.ok) {
                Alert.alert('Login successful')
                router.push('/default')
            }
        } catch (error) {
            // setError(error);
            console.error('Error during login:', error);
        } finally {
            setLoading(false)
        }
    }

    const goHome = () => {
        router.push('/home');
    };
    const routeToSignup = () => {
        router.push('/signup');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <MonoText style={styles.title}>Login page</MonoText>

            <MonoText style={styles.boxText}>
                Don't have an account?{' '}
                <Pressable onPress={routeToSignup}>
                    <MonoText style={styles.boxLink}>Create one</MonoText>
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
                    />
                </View>

                <View style={{position: 'relative'}}>
                    <MonoText style={styles.label}>Enter your password</MonoText>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={visible ? false : true}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />

                    <FontAwesome 
                        // name='eye' 
                        name={visible ? 'eye' : 'eye-slash'} 
                        color={"#333"} 
                        size={16} 
                        style={{position: 'absolute', top: '45%', right: '4%'}} 
                        onPress={toggleVisibility}
                    />
                </View>

                <Pressable style={styles.button} onPress={handleLogin}>
                    <MonoText style={styles.buttonText}>{loading ? <ActivityIndicator /> : "Login"}</MonoText>
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