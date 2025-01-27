import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';
import { PoppinsText } from '@/components/StyledText';
import { useState, useEffect } from 'react'

import CartCard from '@/components/CartCard';

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    rating: number;
    thumbnail: string;
}

const Header = () => (
    <View style={styles.header}>
        <TouchableOpacity
            style={styles.backButton}
        >
            <AntDesign name="arrowleft" size={18} color="black" />
        </TouchableOpacity>
        <PoppinsText style={styles.title}>Cart</PoppinsText>
    </View>
);

const Cart = () => {
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

        if (loading) {
                return (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#007BFF" />
                    </View>
                );
            }

        const sixProducts = products.slice(0,6)

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.safeArea}>
                <Header />

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollViewContent}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.cartItems}>
                        {/* <CartCard /> */}
                        {/* <FlatList
                            data={products}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderItem}
                            showsVerticalScrollIndicator={false}
                            ListEmptyComponent={
                                <View>
                                    <Text>No items in cart</Text>
                                </View>
                            }
                        /> */}

                        {products.length === 0 ? (
                            <View>
                                <Text>No items in cart</Text>
                            </View>
                        ) : (
                            <View>
                                {sixProducts.map((product: Product) => (
                                    <CartCard
                                        key={product.id}
                                        title={product.title}
                                        price={product.price}
                                        description={product.description}
                                        id={0} rating={0} thumbnail={product.thumbnail}                                        // thumbnail={product.thumbnail}
                                    />
                                ))}
                            </View>
                        )}
                    </View>

                    {/* <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ProductCard product={item} onAddToCart={handleAddToCart} />
                )}
            /> */}
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default Cart;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        height: 56,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
        backgroundColor: '#fff',
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        flex: 1,
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        marginRight: 40, // Offset for backButton to center title
    },
    scrollView: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },
    scrollViewContent: {
        padding: 16,
    },
    cartItems: {
        marginBottom: 20,
    },
    summary: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    summaryText: {
        fontSize: 16,
        color: '#666',
    },
    summaryValue: {
        fontSize: 16,
        fontWeight: '500',
    },
    totalRow: {
        marginTop: 8,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    totalText: {
        fontSize: 18,
        fontWeight: '600',
    },
    totalValue: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2ECC71',
    },
    checkoutButton: {
        backgroundColor: '#000',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        marginBottom: 20,
    },
    checkoutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    emptyCart: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    emptyCartText: {
        fontSize: 18,
        color: '#666',
        marginTop: 16,
    },
});