// app/(tabs)/home/index.jsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";

const Home = () => {
  const [searchText, setSearchText] = useState("");
  const [properties, setProperties] = useState([]);
  const router = useRouter();
  

  // Fetch data from the API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("https://pastebin.com/raw/Sa0LzR3T");
        const data = await response.json();
        setProperties(data.properties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  // Filter properties based on search input
  const filteredProperties = properties.filter((property) =>
    property.title.toLowerCase().includes(searchText.toLowerCase())
  );

  // Navigate to Property Details screen
   // Navigate to Property Details screen
   const handlePropertyClick = (propertyId) => {
    router.push(`/property/${propertyId}`);
  };


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search properties"
        value={searchText}
        onChangeText={setSearchText}
      />

      <FlatList
        data={filteredProperties}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.propertyItem}
            onPress={() => handlePropertyClick(item.id)}
          >
            <Image
              source={{ uri: item.images[0] }}
              style={styles.propertyImage}
            />
            <View style={styles.propertyInfo}>
              <Text style={styles.propertyTitle}>{item.title}</Text>
              <Text style={styles.propertyPrice}>${item.price} / month</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  searchBar: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 14,
    paddingLeft: 8,
    marginBottom: 16,
  },
  propertyItem: {
    flexDirection: "row",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 16,
  },
  propertyImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  propertyInfo: {
    justifyContent: "center",
  },
  propertyTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  propertyPrice: {
    color: "#888",
  },
});

export default Home;
