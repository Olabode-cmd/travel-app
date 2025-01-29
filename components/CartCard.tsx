import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { PoppinsText } from './StyledText';
import { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import Product from '../assets/images/s21.webp';

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    rating: number;
    thumbnail: string;
}

const CartCard = (product: Product) => {
    const [isChecked, setIsChecked] = useState(false);

    const toggleCheckbox = () => {
        setIsChecked(!isChecked);
    };

    const renderStars = (rating: number) => {
        return [...Array(5)].map((element , index) => (
            <AntDesign
                key={index}
                name={index < rating ? "star" : "staro"}
                size={16}
                color={index < rating ? "#FFD700" : "#BDC3C7"}
                style={styles.star}
            />
        ));
    };

    return (
        <View style={styles.card}>
            <View style={styles.leftContainer}>
                <View style={styles.checkcontainer}>
                    <TouchableOpacity
                        style={[
                            styles.checkbox,
                            isChecked && styles.checked,
                        ]}
                        onPress={toggleCheckbox}
                    >
                        {isChecked && (
                            <PoppinsText style={styles.checkmark}>
                                <AntDesign name="check" size={18} color={isChecked ? 'white' : undefined} />
                            </PoppinsText>
                        )}
                    </TouchableOpacity>
                </View>

                <Image source={{ uri: product.thumbnail }} style={styles.productImage} />
            </View>

            <View style={styles.productDetails}>
                <View style={styles.titleContainer}>
                    <PoppinsText style={styles.productTitle}>{product.title}</PoppinsText>
                    <PoppinsText style={styles.price}>${product.price}</PoppinsText>
                </View>

                <PoppinsText style={styles.description} numberOfLines={2}>
                    {product.description}
                </PoppinsText>

                <View style={styles.ratingContainer}>
                    <View style={styles.stars}>
                        {renderStars(product.rating)}
                    </View>
                    <PoppinsText style={styles.reviews}>
                        (12 reviews)
                    </PoppinsText>
                </View>
            </View>
        </View>
    )
}

export default CartCard;

const styles = StyleSheet.create({
    card: {
        padding: 15,
        borderColor: '#E0E0E0',
        borderWidth: 1,
        borderRadius: 12,
        marginBottom: 15,
        flexDirection: 'row',
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 1,
        elevation: 1,
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    checkcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 22,
        height: 22,
        borderRadius: 6,
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    checked: {
        backgroundColor: 'orange',
    },
    checkmark: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    productImage: {
        width: 85,
        height: 85,
        borderRadius: 8,
        backgroundColor: '#F8F8F8',
    },
    productDetails: {
        flex: 1,
        justifyContent: 'space-between',
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 6,
    },
    productTitle: {
        fontSize: 16,
        fontWeight: '600',
        flex: 1,
        marginRight: 10,
    },
    price: {
        fontSize: 16,
        fontWeight: '700',
        color: '#2ECC71',
    },
    description: {
        fontSize: 14,
        color: '#7F8C8D',
        marginBottom: 8,
        lineHeight: 20,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    stars: {
        flexDirection: 'row',
        marginRight: 8,
    },
    star: {
        marginRight: 2,
    },
    reviews: {
        fontSize: 12,
        color: '#95A5A6',
    },
});
