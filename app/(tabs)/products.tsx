import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, Pressable, Text } from 'react-native';
import ProductCard from '@/components/productcard';
// import ProductCard from './ProductCard';

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    rating: number;
    thumbnail: string;
}

const ProductsPage: React.FC = () => {
    const [products, setProducts] = useState('<Product[]>([])');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('https://dummyjson.com/products');
            const data = await response.json();
            setProducts(data.products);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = (product: Product) => {
        console.log('Added to cart:', product.title);
    };

    

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007BFF" />
            </View>
        );
    }

    return (
        <View>
            {/* <Pressable onPress={consoleData}>
                <Text>Console data</Text>
            </Pressable> */}
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ProductCard product={item} onAddToCart={handleAddToCart} />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ProductsPage;