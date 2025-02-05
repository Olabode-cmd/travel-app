import { View, Pressable, SafeAreaView, Text } from 'react-native'
import { useRouter } from 'expo-router'

const Permissions = () => {

    const router = useRouter();
    const routeToCamera = () => {
        router.navigate('/permissions/storage');
    }
    return (
        <SafeAreaView>
            <Pressable onPress={routeToCamera} style={{margin: 20, padding: 10, backgroundColor: '#000'}}>
                <Text style={{color: '#fff'}}>Route to Storage</Text>
            </Pressable>
        </SafeAreaView>
    )
}

export default Permissions;