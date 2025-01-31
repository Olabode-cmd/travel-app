import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, Pressable, Text, TextInput } from 'react-native';
import ProductCard from '@/components/productcard';
import { PoppinsText } from '@/components/StyledText'
import { Picker } from "@react-native-picker/picker";
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

    const [name, setName] = useState('');
    const [brand, setBrand] = useState([]);
    const [category, setCategory] = useState([]);
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);

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

    const fetchBrands = async () => {
        try {
            const response = await fetch('https://inevitable-helaina-nilvfgfgfhujkiki-38773413.koyeb.app/api/brand/');
            const data = await response.json();
            setBrand(data);
        } catch (error) {
            console.error('Error fetching brands:', error);
        }
    };

    const fetchCategory = async () => {
        try {
            const response = await fetch('https://inevitable-helaina-nilvfgfgfhujkiki-38773413.koyeb.app/api/category/');
            const data = await response.json();
            setCategory(data);
        } catch (error) {
            console.error('Error fetching brands:', error);
        }
    };

    const deleteProduct = async () => {
        try{
            const response = await fetch('XXXXXXXXXXXXXXXXXXXXX/id', {
                method: 'DELETE',
            });
        } catch (error) {
            console.error('Error deleting product:', error);
        } finally {
            setLoading(false);
        }
    }

    const handleAddToCart = (product: Product) => {
        console.log('Added to cart:', product.title);
    };

    const consoleData = () => {
        console.log(products);
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
            <Pressable onPress={consoleData}>
                <Text>Console data</Text>
            </Pressable>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ProductCard product={item} onAddToCart={handleAddToCart} />
                )}
            />

            <View>
                <View>
                    <PoppinsText>Name</PoppinsText>
                    <TextInput
                        value={name}
                        onChangeText={(text) => setName(text)}
                        inputMode="text"
                    />
                </View>

                <View>
                    <PoppinsText>Name</PoppinsText>
                    {/* <TextInput
                        value={price}
                        onChangeText={(text) => setPrice(text)}
                        inputMode="text"
                    /> */}
                </View>

                <View>
                    {/* <Picker
                        selectedValue={selectedLanguage}
                        onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
                        style={styles.picker}
                    >
                        
                        <Picker.Item label="JavaScript" value="javascript" />
                        <Picker.Item label="Python" value="python" />
                        <Picker.Item label="Java" value="java" />
                        <Picker.Item label="C++" value="cpp" />
                        <Picker.Item label="Ruby" value="ruby" />
                        <Picker.Item label="Swift" value="swift" />
                    </Picker> */}
                </View>
            </View>
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