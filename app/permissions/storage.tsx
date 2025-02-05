import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import RNFS from 'react-native-fs';

const Storage = () => {
    const [storage, setStorage] = useState([]);

    useEffect(() => {
        getFiles();
    })

    const getFiles = async () => {
        const path = RNFS.DocumentDirectoryPath
        const fileList = await RNFS.readDir(path);
        setStorage(fileList.map(file => file.name));
    }
    return (
        <View style={StyleSheet.container}>
            <Text>Saved Files</Text>

            <FlatList
                data={storage}
                keyExtractor={(item) => item}
                renderItem={({ item }) => <Text>{item}</Text>}
            />
        </View>
    )
}

export default Storage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});