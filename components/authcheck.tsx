import AsyncStorage from '@react-native-async-storage/async-storage';

const isAuthenticated = async () => {
    const token = await AsyncStorage.getItem('accessToken');
    return !!token;
};

export default isAuthenticated;
