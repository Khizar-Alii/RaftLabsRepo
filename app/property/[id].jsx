import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import useBookingStore from "../../store/useBookingStore"; 

const PropertyDetails = () => {
  const [property, setProperty] = useState(null);
  const { id } = useLocalSearchParams();
  const addBooking = useBookingStore((state) => state.addBooking); 
  
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "",
      headerStyle: {
        borderWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
        shadowRadius: 0,
        shadowOffset: { height: 0, width: 0 },
      },
    });
  }, []);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await fetch("https://pastebin.com/raw/Sa0LzR3T");
        const data = await response.json();
        const selectedProperty = data.properties.find((item) => item.id === id);
        setProperty(selectedProperty);
      } catch (error) {
        console.error("Error fetching property details:", error);
      }
    };

    if (id) {
      fetchPropertyDetails();
    }
  }, [id]);

  if (!property) {
    return <Text>Loading...</Text>;
  }

  const handleGetBooking = () => {
    addBooking(property);
    alert("Booking Added!");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Image
          source={{ uri: property.images[0] }}
          style={styles.propertyImage}
        />
        <Text style={styles.propertyTitle}>{property.title}</Text>
        <Text style={styles.propertyPrice}>${property.price} / month</Text>
        <Text style={styles.propertyLocation}>
          {property.location.address}, {property.location.city},{" "}
          {property.location.state}
        </Text>
        <Text style={styles.propertyFeatures}>Features:</Text>
        {property.features.map((feature, index) => (
          <Text key={index} style={styles.featureItem}>
            - {feature}
          </Text>
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleGetBooking}
        >
          <Text style={styles.buttonText}>Get Booking</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    flex: 1,
    padding: 16,
    paddingBottom: 50,
  },
  propertyImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  propertyTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  propertyPrice: {
    fontSize: 18,
    color: "#888",
    marginBottom: 8,
  },
  propertyLocation: {
    fontSize: 16,
    marginBottom: 16,
  },
  propertyFeatures: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  featureItem: {
    fontSize: 16,
    color: "#555",
  },
  buttonContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PropertyDetails;
