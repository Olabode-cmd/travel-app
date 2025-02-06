import { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import ProductCard from '@/components/defaultcard';
import { AntDesign } from '@expo/vector-icons';
import { PoppinsText } from '@/components/StyledText';
import { useRouter } from 'expo-router';

export default function SearchResults() {
    const { query } = useLocalSearchParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products');
                const data = await response.json();

                // Filter products based on search query
                const filteredProducts = data.products.filter(product =>
                    product.title.toLowerCase().includes(query.toLowerCase())
                );

                setProducts(filteredProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [query]);

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    const renderHeader = () => (
        <View style={styles.headerContainer}>
            <TouchableOpacity
                onPress={() => router.back()}
                style={styles.backButton}
            >
                <AntDesign name="arrowleft" size={24} color="#000" />
            </TouchableOpacity>
            <PoppinsText style={styles.headerTitle}>
                Search Results for "{decodeURIComponent(query)}"
            </PoppinsText>
        </View>
    );

    const renderItem = ({ item, index }) => (
        <View style={[
            styles.cardWrapper,
            index % 2 === 0 ? { marginRight: COLUMN_GAP / 2 } : { marginLeft: COLUMN_GAP / 2 }
        ]}>
            <ProductCard
                id={item.id}
                title={item.title}
                price={item.price}
                rating={item.rating}
                image={item.thumbnail}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            {renderHeader()}
            {/* <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                numColumns={1}
                contentContainerStyle={styles.productList}
                ListEmptyComponent={
                    <PoppinsText style={styles.noResults}>No products found for "{decodeURIComponent(query)}"</PoppinsText>
                }
            /> */}

            <View style={styles.productGrid}>
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        price={product.price}
                        rating={product.rating}
                        image={product.thumbnail}
                    />
                ))}
            </View>

            {/* <View style={styles.productsGrid}>
        {fourProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            rating={product.rating}
            image={product.thumbnail}
          />
        ))}
      </View> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    productGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 15,
        justifyContent: 'space-between',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        backgroundColor: '#fff',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    headerTitle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        marginRight: 24,
    },
    backButton: {
        padding: 8,
        marginRight: 8,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noResults: {
        textAlign: 'center',
        fontSize: 16,
        color: '#666',
        marginTop: 32,
    },
});
