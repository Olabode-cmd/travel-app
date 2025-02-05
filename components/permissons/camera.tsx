import React from "react";
import { View, StyleSheet } from 'react-native'
import { RNCamera } from 'react-native-camera'

const CameraScreen = () => {
    return (
        <View style={styles.container}>
            <RNCamera
                style={styles.camera}
                type={RNCamera.Constants.Type.back}
                captureAudio={false}
            />
        </View>
    )
}

export default CameraScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    camera: {
        flex: 1,
        width: '100%',
    },
})