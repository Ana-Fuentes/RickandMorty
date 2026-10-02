import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import { GetLocations } from '@/application/useCases/GetLocations';
import { LocationRepositoryImpl } from '@/infrastructure/repositories/LocationRepositoryImpl';

export default function LocationsScreen() {
  const [locations, setLocations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [screen, setScreen] = useState<
    'characters' | 'locations'
  >('locations');

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

      <View style={styles.navigation}>

        <TouchableOpacity
          style={[
            styles.button,
            screen === 'characters' && styles.activeButton,
          ]}
          onPress={() => setScreen('characters')}
        >
          <Text style={styles.buttonText}>
            CHARACTERS
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            screen === 'locations' && styles.activeButton,
          ]}
          onPress={() => setScreen('locations')}
        >
          <Text style={styles.buttonText}>
            LOCATIONS
          </Text>
        </TouchableOpacity>

      </View>

      {screen === 'locations' && (
        <>
          <Text style={styles.sectionTitle}>
            LOCATIONS
          </Text>

          <FlatList
            data={locations}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}

            renderItem={({ item }) => (
              <View style={styles.card}>

                <Image
                  source={{
                    uri: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
                  }}
                  style={styles.image}
                  resizeMode="cover"
                />

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
        </>
      )}

      {screen === 'characters' && (
        <View style={styles.center}>
          <Text style={styles.loading}>
            CHARACTERS
          </Text>
        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingHorizontal: 15,
  },

  navigation: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },

  button: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#B026FF',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
  },

  activeButton: {
    backgroundColor: '#1A0A24',
  },

  buttonText: {
    color: '#B026FF',
    fontSize: 14,
    fontWeight: 'bold',
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
    fontSize: 16,
  },
});