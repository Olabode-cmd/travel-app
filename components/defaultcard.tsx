import { TouchableOpacity, View, StyleSheet, Image } from "react-native";
import { PoppinsText } from "./StyledText";
import { useRouter } from "expo-router";

const ProductCard = ({ id, title, price, rating, image }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => {
        router.push(`/product/${id}`);
      }}
    >
      <Image source={{ uri: image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <PoppinsText style={styles.productTitle}>{title}</PoppinsText>
        <View style={styles.ratingContainer}>
          <PoppinsText style={styles.rating}>★{rating}</PoppinsText>
          <PoppinsText style={styles.reviews}> • {Math.floor(Math.random() * 100)} reviews</PoppinsText>
        </View>
        <PoppinsText style={styles.price}>${price}</PoppinsText>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
    productCard: {
        width: '48%',
        backgroundColor: '#fff',
        borderRadius: 15,
        marginBottom: 15,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    productImage: {
        width: '100%',
        height: 150,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    productInfo: {
        padding: 10,
    },
    productTitle: {
        fontSize: 16,
        fontWeight: '500',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    rating: {
        color: '#FFD700',
    },
    reviews: {
        color: '#666',
        fontSize: 12,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
})