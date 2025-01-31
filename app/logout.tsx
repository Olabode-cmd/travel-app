import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native';
import { PoppinsText } from '@/components/StyledText';

const Logout = () => {
    const router = useRouter();

    useEffect(() => {
        const logout = async () => {
            await AsyncStorage.removeItem('accessToken');

            setTimeout(() => {
                router.push('/login');
            }, 1000);
        };

        logout();
    }, [router]);

    return (
        <View>
            <PoppinsText>Logging out...</PoppinsText>
        </View>
    );
};

export default Logout;