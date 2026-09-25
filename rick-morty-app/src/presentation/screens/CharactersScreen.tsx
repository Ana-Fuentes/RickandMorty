import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import { GetCharacters } from '@/application/useCases/GetCharacters';
import { CharacterRepositoryImpl } from '@/infrastructure/repositories/CharacterRepositoryImpl';

export default function CharactersScreen() {
  const [characters, setCharacters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCharacters();
  }, []);

  const loadCharacters = async () => {
    try {
      const repository = new CharacterRepositoryImpl();
      const useCase = new GetCharacters(repository);

      const data = await useCase.execute();

      setCharacters(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#B026FF" />
        <Text style={styles.loading}>Cargando personajes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <Text style={styles.sectionTitle}>CHARACTERS</Text>

      <FlatList
        data={characters}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>

            <Image
              source={{ uri: item.image }}
              style={styles.image}
            />

            <View style={styles.info}>
              <Text style={styles.name}>
                {item.name}
              </Text>

              <Text style={styles.text}>
                Estado: {item.status}
              </Text>

              <Text style={styles.text}>
                Especie: {item.species}
              </Text>

              <Text style={styles.text}>
                Género: {item.gender}
              </Text>
            </View>

          </View>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingHorizontal: 15,
  },

  sectionTitle: {
    color: '#B026FF',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#0A0A0A',
    borderWidth: 2,
    borderColor: '#B026FF',
    borderRadius: 15,
    padding: 10,
    marginBottom: 12,
  },

  image: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },

  info: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 15,
  },

  name: {
    color: '#B026FF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  text: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 2,
  },

  center: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },

  loading: {
    color: '#B026FF',
    marginTop: 10,
  },
});