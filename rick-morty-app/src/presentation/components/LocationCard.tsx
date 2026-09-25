import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Location } from "../../domain/entities/Location";

interface Props {
  location: Location;
}

export default function LocationCard({ location }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{location.name}</Text>

      <Text>Tipo: {location.type}</Text>

      <Text>Dimensión: {location.dimension}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    padding: 18,
    borderRadius: 15,
    marginBottom: 12,
  },

  name: {
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 8,
  },
});