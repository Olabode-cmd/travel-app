import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    rating: number;
    thumbnail: string;
}
const { width } = Dimensions.get('window');

export default function ProductDetails() {
    const { id } = useLocalSearchParams();
    const [product, setProduct] = useState<Product>();
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    const [selectedStorage, setSelectedStorage] = useState('512');

    const StorageButton = ({ size }) => (
        <TouchableOpacity
            style={[
                styles.storageBtn,
                selectedStorage === size && styles.storageBtnActive
            ]}
            onPress={() => setSelectedStorage(size)}
        >
            <Text style={[
                styles.storageBtnText,
                selectedStorage === size && styles.storageBtnTextActive
            ]}>{size} GB</Text>
        </TouchableOpacity>
    );


    useEffect(() => {
        if (!id) return;

        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://dummyjson.com/products/${id}`);
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <ActivityIndicator size="large" color="blue" />;
    }

    if (!product) {
        return <Text style={{color: 'red', fontSize: 20}}>Product not found.</Text>;
    }

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <AntDesign name="left" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.heartBtn}>
                    <AntDesign name="heart" size={24} color="#FF4D4D" />
                </TouchableOpacity>
            </View>

            {/* Product Image */}
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: product.thumbnail }}
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>

            {/* Product Info */}
            <View style={styles.infoContainer}>
                <View style={styles.titleRow}>
                    <Text style={styles.title}>{product.title}</Text>
                    <View style={styles.saleTag}>
                        <Text style={styles.saleText}>On sale</Text>
                    </View>
                </View>

                <View style={styles.ratingContainer}>
                    <FontAwesome name="star" size={16} color="#FFD700" />
                    <Text style={styles.rating}> {product.rating}</Text>
                    <Text style={styles.reviews}> • {Math.floor(Math.random() * 200)} reviews</Text>
                </View>

                <Text style={styles.description}>{product.description}</Text>

                {/* Storage Options */}
                <View style={styles.storageSection}>
                    <Text style={styles.storageTitle}>Storage</Text>
                    <View style={styles.storageBtnContainer}>
                        <StorageButton size="512" />
                        <StorageButton size="1024" />
                    </View>
                </View>

                {/* Price and Add to Cart */}
                <View style={styles.bottomSection}>
                    <View>
                        <Text style={styles.priceLabel}>Price</Text>
                        <Text style={styles.price}>${product.price}</Text>
                    </View>
                    <TouchableOpacity style={styles.addToCartBtn}>
                        <Text style={styles.addToCartText}>Add to Cart</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        // paddingTop: 40,
    },
    heartBtn: {
        backgroundColor: 'white',
        padding: 8,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    imageContainer: {
        width: width,
        height: 300,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '80%',
        height: '80%',
    },
    infoContainer: {
        padding: 20,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        flex: 1,
        marginRight: 10,
    },
    saleTag: {
        backgroundColor: '#FF4D4D',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
    },
    saleText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    rating: {
        fontSize: 16,
        fontWeight: '500',
    },
    reviews: {
        color: '#666',
        fontSize: 14,
    },
    description: {
        fontSize: 14,
        lineHeight: 22,
        color: '#666',
        marginBottom: 20,
    },
    storageSection: {
        marginBottom: 20,
    },
    storageTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
    },
    storageBtnContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    storageBtn: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    storageBtnActive: {
        backgroundColor: '#000',
        borderColor: '#000',
    },
    storageBtnText: {
        color: '#000',
    },
    storageBtnTextActive: {
        color: '#fff',
    },
    bottomSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    priceLabel: {
        fontSize: 14,
        color: '#666',
    },
    price: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    addToCartBtn: {
        backgroundColor: '#4CAF50',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 25,
    },
    addToCartText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});