import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';

import { GetLocations } from '@/application/useCases/GetLocations';
import { LocationRepositoryImpl } from '@/infrastructure/repositories/LocationRepositoryImpl';

export default function LocationsScreen() {
  const [locations, setLocations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLocations();
  }, []);

  const loadLocations = async () => {
    try {
      const repository = new LocationRepositoryImpl();
      const useCase = new GetLocations(repository);

      const data = await useCase.execute();

      setLocations(data);
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

        <Text style={styles.loading}>
          Cargando ubicaciones...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <Text style={styles.sectionTitle}>
        LOCATIONS
      </Text>

      <FlatList
        data={locations}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}

        renderItem={({ item }) => (
          <View style={styles.card}>

            {/* Imagen pequeña a la izquierda */}
            <Image
              source={{
                uri: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
              }}
              style={styles.image}
              resizeMode="cover"
            />

            {/* Información de la ubicación */}
            <View style={styles.info}>

              <Text style={styles.name}>
                {item.name}
              </Text>

              <Text style={styles.text}>
                Tipo: {item.type}
              </Text>

              <Text style={styles.text}>
                Dimensión: {item.dimension}
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

    textShadowColor: '#B026FF',
    textShadowOffset: {
      width: 0,
      height: 0,
    },
    textShadowRadius: 10,
  },

  card: {
    backgroundColor: '#0A0A0A',

    borderWidth: 2,
    borderColor: '#B026FF',

    borderRadius: 18,

    padding: 12,
    marginBottom: 15,

    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: '#B026FF',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 8,

    elevation: 8,
  },

  image: {
    width: 80,
    height: 80,

    borderRadius: 12,

    borderWidth: 1,
    borderColor: '#B026FF',

    marginRight: 15,
  },

  info: {
    flex: 1,
  },

  name: {
    color: '#B026FF',

    fontSize: 17,
    fontWeight: 'bold',

    marginBottom: 8,

    textShadowColor: '#B026FF',
    textShadowOffset: {
      width: 0,
      height: 0,
    },
    textShadowRadius: 5,
  },

  text: {
    color: '#FFFFFF',

    fontSize: 14,

    marginBottom: 4,
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

    fontSize: 16,
  },

});

