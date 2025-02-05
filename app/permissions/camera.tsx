import { useEffect, useState } from 'react';
import { Camera } from 'react-native-vision-camera';
import { View, Text } from 'react-native';

const CameraScreen = () => {
    const [hasPermission, setHasPermission] = useState(false);

    useEffect(() => {
        (async () => {
            const permission = await Camera.requestCameraPermission();
            setHasPermission(permission === 'authorized');
        })();
    }, []);

    if (!hasPermission) return <Text>No camera permission</Text>;

    return <Camera style={{ flex: 1 }} />;
}

export default CameraScreen;
