import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    rating: number;
    thumbnail: string;
}

interface ProductCardProps {
    product: { id: number; title: string; description: string; price: number; rating: number; thumbnail: string };
    onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: product.thumbnail }}
            style={styles.image} />

            <View style={styles.details}>
                <Text style={styles.title}>{product.title}</Text>
                <Text style={styles.description}>{product.description}</Text>
                <Text style={styles.price}>${product.price}</Text>
                <Text style={styles.rating}>Rating: {product.rating} ⭐</Text>
                <Pressable style={styles.button} onPress={() => onAddToCart(product)}>
                    <Text style={styles.buttonText}>Add to Cart</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        marginVertical: 10,
        marginHorizontal: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 4,
    },
    image: {
        width: '100%',
        height: 150,
    },
    details: {
        padding: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    rating: {
        fontSize: 14,
        color: '#888',
        marginBottom: 12,
    },
    button: {
        backgroundColor: '#007BFF',
        borderRadius: 4,
        paddingVertical: 10,
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
});

export default ProductCard;