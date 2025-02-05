import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Profile({ navigation }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    const router = useRouter();

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const token = await AsyncStorage.getItem('accessToken');
            if (!token) {
                setError('No auth token found');
                setLoading(false);
                return;
            }

            const response = await fetch('https://dummyjson.com/auth/me', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.message === 'Token expired' || response.status === 401) {
                    await AsyncStorage.removeItem('accessToken');
                    router.push('/login');

                    // Set the error message
                    setError('Session expired. Please log in again.');
                    setLoading(false);
                    return;
                }
                throw new Error(data.message || 'Failed to fetch profile');
            }

            setUser(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('accessToken');
            router.replace('/login');
        } catch (err) {
            console.error('Error logging out:', err);
        }
    };

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#4CAF50" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text style={styles.error}>{error}</Text>
                <TouchableOpacity
                    style={styles.retryButton}
                    onPress={fetchUserProfile}
                >
                    <Text style={styles.retryText}>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" hidden={false} />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Profile</Text>
                <TouchableOpacity onPress={handleLogout}>
                    <AntDesign name="logout" size={24} color="#FF4D4D" />
                </TouchableOpacity>
            </View>

            {/* Profile Info */}
            <View style={styles.profileSection}>
                <Image
                    source={{ uri: user?.image }}
                    style={styles.profileImage}
                />
                <Text style={styles.name}>{user?.firstName} {user?.lastName}</Text>
                <Text style={styles.username}>@{user?.username}</Text>
                <Text style={styles.email}>{user?.email}</Text>
            </View>

            {/* User Details */}
            <View style={styles.detailsSection}>
                <View style={styles.detailRow}>
                    <MaterialCommunityIcons name="gender-male-female" size={24} color="#666" />
                    <View style={styles.detailTextContainer}>
                        <Text style={styles.detailLabel}>Gender</Text>
                        <Text style={styles.detailValue}>{user?.gender}</Text>
                    </View>
                </View>

                <View style={styles.detailRow}>
                    <Ionicons name="call-outline" size={24} color="#666" />
                    <View style={styles.detailTextContainer}>
                        <Text style={styles.detailLabel}>Phone</Text>
                        <Text style={styles.detailValue}>{user?.phone}</Text>
                    </View>
                </View>

                <View style={styles.detailRow}>
                    <Ionicons name="location-outline" size={24} color="#666" />
                    <View style={styles.detailTextContainer}>
                        <Text style={styles.detailLabel}>Address</Text>
                        <Text style={styles.detailValue}>
                            {user?.address?.address}, {user?.address?.city}
                        </Text>
                    </View>
                </View>

                <View style={styles.detailRow}>
                    <AntDesign name="idcard" size={24} color="#666" />
                    <View style={styles.detailTextContainer}>
                        <Text style={styles.detailLabel}>Age</Text>
                        <Text style={styles.detailValue}>{user?.age}</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    profileSection: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 15,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    username: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
    },
    email: {
        fontSize: 14,
        color: '#666',
    },
    detailsSection: {
        padding: 20,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    detailTextContainer: {
        marginLeft: 15,
    },
    detailLabel: {
        fontSize: 12,
        color: '#666',
    },
    detailValue: {
        fontSize: 16,
        color: '#000',
        marginTop: 2,
        textTransform: 'capitalize'
    },
    error: {
        color: '#FF4D4D',
        fontSize: 16,
        marginBottom: 15,
    },
    retryButton: {
        backgroundColor: '#4CAF50',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    retryText: {
        color: '#fff',
        fontSize: 16,
    },
});