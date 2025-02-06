import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Image, TouchableOpacity, StatusBar } from 'react-native';
import { PoppinsText } from '@/components/StyledText';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import ProductCard from '@/components/defaultcard';
import { FadeView } from '@/animations/animated';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  thumbnail: string;
}

const CategoryButton = ({ title }) => (
  <TouchableOpacity style={styles.categoryButton}>
    <PoppinsText style={styles.categoryButtonText}>{title}</PoppinsText>
  </TouchableOpacity>
);

export default function Default() {
  const [products, setProducts] = useState<Product>([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search/${encodeURIComponent(searchQuery.trim())}`);
    }
  };

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

    const fourProducts = products.slice(0,13);
  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" hidden={false} />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <AntDesign
          name="search1"
          size={20}
          color="#999"
          style={styles.searchIcon}
        />
      </View>

      {/* Clearance Sales Banner */}
      <View style={styles.bannerContainer}>
        <View style={styles.banner}>
          <PoppinsText style={styles.bannerTitle}>Clearance{'\n'}Sales</PoppinsText>
          <Image source={require('../../assets/images/iphone.png')} style={styles.bannerImage} />
        </View>
      </View>

      {/* Categories */}
      <Text style={styles.sectionTitle}>Categories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
        <CategoryButton title="All" />
        <CategoryButton title="Smartphones" />
        <CategoryButton title="Headphones" />
        <CategoryButton title="Laptops" />
      </ScrollView>

      {/* Products Grid */}
      <View style={styles.productsGrid}>
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
      </View>

      {/* <FadeView>
        <Text>This fades in!</Text>
      </FadeView> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 15,
    justifyContent: 'space-between',
  },
  searchContainer: {
    padding: 15,
    position: 'relative',
  },
  searchInput: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    paddingRight: 40,
    borderRadius: 10,
    fontSize: 16,
  },
  searchIcon: {
    position: 'absolute',
    right: 25,
    top: 35,
    transform: [{ translateY: -10 }],
  },
  bannerContainer: {
    padding: 15,
  },
  banner: {
    backgroundColor: '#4CAF50',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 120,
  },
  bannerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  bannerImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    // maxWidth: '100%',
    resizeMode: 'contain'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
    marginTop: 10,
  },
  categoriesContainer: {
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  categoryButton: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#333',
  },
});