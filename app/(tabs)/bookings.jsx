// app/bookings.jsx
import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import useBookingStore from "../../store/useBookingStore";

const Bookings = () => {
  const bookings = useBookingStore((state) => state.bookings); 

  
  if (bookings.length === 0) {
    return (
      <View style={styles.noContainer}>
        <Text style={{textAlign:'center',color : 'lightgrey',fontWeight : '700',fontSize : 20}}>No bookings available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Bookings</Text>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.bookingItem}>
            <Text style={styles.bookingTitle}>{item.title}</Text>
            <Text style={styles.bookingDetails}>${item.price} / month</Text>
          </View>
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
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  bookingItem: {
    padding: 16,
    backgroundColor: "#f2f2f2",
    marginBottom: 8,
    borderRadius: 8,
  },
  bookingTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  bookingDetails: {
    fontSize: 16,
    color: "#888",
  },
  noContainer  : {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    justifyContent : 'center',
    alignItems : 'center',
  },
});

export default Bookings;
