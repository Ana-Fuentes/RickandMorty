import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Character } from "../../domain/entities/Character";

interface Props {
  character: Character;
}

export default function CharacterCard({ character }: Props) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: character.image }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.name}>{character.name}</Text>
        <Text>Estado: {character.status}</Text>
        <Text>Especie: {character.species}</Text>
        <Text>Género: {character.gender}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 10,
    marginBottom: 12,
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },

  info: {
    paddingLeft: 12,
    justifyContent: "center",
    flex: 1,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
});