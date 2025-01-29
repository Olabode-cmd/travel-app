import React, { useRef, useEffect } from 'react';
import { View, Animated, StyleSheet, Pressable, Text } from 'react-native';

// Basic Fade Animation Component
const FadeView = ({ children }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <Animated.View style={{ opacity: fadeAnim }}>
            {children}
        </Animated.View>
    );
};

// Spring Animation Component
const SpringBox = () => {
    const springAnim = useRef(new Animated.Value(100)).current;

    const startSpring = () => {
        Animated.spring(springAnim, {
            toValue: 300,
            friction: 5,
            tension: 40,
            useNativeDriver: true,
        }).start(() => {
            // Reset animation
            springAnim.setValue(100);
        });
    };

    return (
        <Pressable onPress={startSpring}>
            <Animated.View
                style={[
                    styles.box,
                    {
                        transform: [{ translateX: springAnim }],
                    },
                ]}
            >
                <Text>Press me!</Text>
            </Animated.View>
        </Pressable>
    );
};

// Sequence Animation Component
const SequenceAnimation = () => {
    const moveX = useRef(new Animated.Value(0)).current;
    const moveY = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(1)).current;

    const startSequence = () => {
        Animated.sequence([
            Animated.timing(moveX, {
                toValue: 200,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(moveY, {
                toValue: 200,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.spring(scale, {
                toValue: 2,
                friction: 3,
                useNativeDriver: true,
            }),
        ]).start(() => {
            // Reset animations
            moveX.setValue(0);
            moveY.setValue(0);
            scale.setValue(1);
        });
    };

    return (
        <Pressable onPress={startSequence}>
            <Animated.View
                style={[
                    styles.box,
                    {
                        transform: [
                            { translateX: moveX },
                            { translateY: moveY },
                            { scale: scale },
                        ],
                    },
                ]}
            >
                <Text>Sequence</Text>
            </Animated.View>
        </Pressable>
    );
};

// Parallel Animation Component
const ParallelAnimation = () => {
    const rotation = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(1)).current;

    const startParallel = () => {
        Animated.parallel([
            Animated.timing(rotation, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.spring(scale, {
                toValue: 1.5,
                friction: 3,
                useNativeDriver: true,
            }),
        ]).start(() => {
            rotation.setValue(0);
            scale.setValue(1);
        });
    };

    const spin = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <Pressable onPress={startParallel}>
            <Animated.View
                style={[
                    styles.box,
                    {
                        transform: [
                            { rotate: spin },
                            { scale: scale },
                        ],
                    },
                ]}
            >
                <Text>Parallel</Text>
            </Animated.View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    box: {
        width: 100,
        height: 100,
        backgroundColor: '#61dafb',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export { FadeView, SpringBox, SequenceAnimation, ParallelAnimation };